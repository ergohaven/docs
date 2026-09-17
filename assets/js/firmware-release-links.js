(() => {
  "use strict";

  const sources = {
    qmk: {
      apiUrl: "https://api.github.com/repos/ergohaven/vial-qmk/releases?per_page=20",
      repository: "vial-qmk",
      tagPattern: /^(\d+)\.(\d+)\.(\d+)$/,
    },
    rmk: {
      apiUrl: "https://api.github.com/repos/ergohaven/rmk/releases?per_page=30",
      repository: "rmk",
      tagPattern: /^v(\d+)\.(\d+)\.(\d+)$/,
    },
  };

  const parseVersion = (source, tag) => {
    const match = sources[source]?.tagPattern.exec(tag || "");
    return match ? match.slice(1).map(Number) : null;
  };

  const compareVersions = (source, left, right) => {
    const leftVersion = parseVersion(source, left) || [];
    const rightVersion = parseVersion(source, right) || [];

    for (let index = 0; index < 3; index += 1) {
      const difference = (leftVersion[index] || 0) - (rightVersion[index] || 0);
      if (difference) return difference;
    }

    return 0;
  };

  const parseFirmwareLink = (value, link = null) => {
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return null;
    }

    if (url.protocol !== "https:" || url.hostname !== "github.com" || url.search || url.hash) {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    if (
      parts.length !== 6
      || parts[0] !== "ergohaven"
      || parts[2] !== "releases"
      || parts[3] !== "download"
    ) {
      return null;
    }

    const [, repository, , , tag, filename] = parts;

    if (repository === sources.qmk.repository) {
      const prefix = `${tag}_`;
      if (
        !parseVersion("qmk", tag)
        || !filename.startsWith(prefix)
        || !filename.endsWith(".uf2")
      ) {
        return null;
      }

      const key = filename.slice(prefix.length, -4);
      if (!/^[a-z0-9][a-z0-9_]*$/.test(key)) return null;
      return { source: "qmk", key, link, fallbackUrl: url.href };
    }

    if (repository === sources.rmk.repository) {
      const suffix = `-${tag}.zip`;
      if (
        !parseVersion("rmk", tag)
        || !filename.endsWith(suffix)
      ) {
        return null;
      }

      const key = filename.slice(0, -suffix.length);
      if (!/^[a-z0-9][a-z0-9-]*$/.test(key)) return null;
      return { source: "rmk", key, link, fallbackUrl: url.href };
    }

    return null;
  };

  const stableReleases = (source, releases) => (Array.isArray(releases) ? releases : [])
    .filter((release) => (
      release
      && release.draft === false
      && release.prerelease === false
      && parseVersion(source, release.tag_name)
      && Array.isArray(release.assets)
    ))
    .sort((left, right) => compareVersions(source, right.tag_name, left.tag_name));

  const trustedAsset = (source, release, expectedName) => {
    const matches = release.assets.filter((asset) => {
      if (
        !asset
        || asset.name !== expectedName
        || asset.state !== "uploaded"
        || !Number.isFinite(Number(asset.size))
        || Number(asset.size) <= 0
      ) {
        return false;
      }

      let url;
      try {
        url = new URL(asset.browser_download_url);
      } catch (_) {
        return false;
      }

      const expectedPath = `/ergohaven/${sources[source].repository}/releases/download/${release.tag_name}/${expectedName}`;
      return url.protocol === "https:"
        && url.hostname === "github.com"
        && url.pathname === expectedPath
        && !url.search
        && !url.hash;
    });

    return matches.length === 1 ? matches[0] : null;
  };

  const resolveQmk = (entries, releases) => {
    if (!entries.length) return [];

    for (const release of stableReleases("qmk", releases)) {
      const resolved = entries.map((entry) => {
        const expectedName = `${release.tag_name}_${entry.key}.uf2`;
        const asset = trustedAsset("qmk", release, expectedName);
        return asset ? { entry, asset, tag: release.tag_name } : null;
      });

      if (resolved.every(Boolean)) return resolved;
    }

    return [];
  };

  const resolveRmk = (entries, releases) => {
    const candidates = stableReleases("rmk", releases);

    return entries.flatMap((entry) => {
      for (const release of candidates) {
        const expectedName = `${entry.key}-${release.tag_name}.zip`;
        const asset = trustedAsset("rmk", release, expectedName);
        if (asset) return [{ entry, asset, tag: release.tag_name }];
      }

      return [];
    });
  };

  const fetchReleases = async (source) => {
    const response = await fetch(sources[source].apiUrl, {
      cache: "default",
      credentials: "omit",
      headers: { Accept: "application/vnd.github+json" },
      referrerPolicy: "no-referrer",
    });

    if (!response.ok) throw new Error(`GitHub release request failed: ${response.status}`);

    const releases = await response.json();
    if (!Array.isArray(releases)) throw new Error("GitHub release response is incomplete");
    return releases;
  };

  const applyResolvedLinks = (resolved) => {
    resolved.forEach(({ entry, asset, tag }) => {
      if (!entry.link) return;
      entry.link.href = asset.browser_download_url;
      entry.link.dataset.firmwareReleaseState = "resolved";
      entry.link.dataset.firmwareReleaseVersion = tag;
    });
  };

  const initialize = () => {
    const entries = Array.from(document.querySelectorAll("a[data-firmware-release-link]"))
      .map((link) => parseFirmwareLink(link.href, link))
      .filter(Boolean);

    Object.keys(sources).forEach((source) => {
      const sourceEntries = entries.filter((entry) => entry.source === source);
      if (!sourceEntries.length) return;

      fetchReleases(source)
        .then((releases) => (
          source === "qmk"
            ? resolveQmk(sourceEntries, releases)
            : resolveRmk(sourceEntries, releases)
        ))
        .then(applyResolvedLinks)
        .catch(() => {
          // Keep the verified static URLs rendered by Hugo as a safe fallback.
        });
    });
  };

  const testApi = {
    compareVersions,
    parseFirmwareLink,
    resolveQmk,
    resolveRmk,
    stableReleases,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = testApi;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
      initialize();
    }
  }
})();
