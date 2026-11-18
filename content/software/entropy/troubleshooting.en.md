---
title: Troubleshooting
weight: 6
prev: universal-symbols
---

## Entropy does not start

{{< tabs items="Windows,macOS,Linux" >}}
  {{< tab >}}

- Make sure you downloaded `windows-x86_64.exe`
- In SmartScreen, click **More info → Run anyway**
- Move the file from a temporary folder to a permanent location and run it again
- Check whether antivirus software blocked the file

  {{< /tab >}}
  {{< tab >}}

- Make sure you selected the correct architecture: `arm64` for Apple Silicon or `x86_64` for Intel
- Drag the application from the DMG to `/Applications`
- Run:

  ```bash
  xattr -dr com.apple.quarantine /Applications/Entropy.app
  open /Applications/Entropy.app
  ```

  {{< /tab >}}
  {{< tab >}}

- Allow the AppImage to run with `chmod +x <file>.AppImage`
- Run it from a local filesystem rather than directly from an archive or network folder
- If no window appears, run the AppImage from Terminal and save the error output

  {{< /tab >}}
{{< /tabs >}}

## Device not found

1. Check the USB cable or device charge
2. Reconnect the device and wait for another scan
3. Open **Layout** and select the device manually
4. Close other configurators that may be holding the HID interface
5. Test another USB port

For Bluetooth, pair the device in operating-system settings first and then select its Bluetooth connection in Entropy

If both USB and Bluetooth entries exist for the same device, select the transport currently in use

### Linux

Open **Config → App settings → Vial access**, click **Install rules**, and reconnect the device

Do not run Entropy as root for normal use

### macOS Bluetooth

Allow Entropy under **System Settings → Privacy & Security → Input Monitoring**, fully quit the application, and launch it again

## Device locked

Some Vial devices prevent configuration changes until they are unlocked

1. Open **Config**
2. Click **Unlock device**
3. Hold the physical keys highlighted on the layout
4. Wait for the successful unlock message

You can lock the device again through the same menu after configuration

## Device data takes too long to load

Over Bluetooth, Entropy loads the first layer immediately and reads other layers and settings in the background

- Do not switch devices during initial loading
- Click **Retry** if only one section failed
- Reconnect the device after repeated failures
- After updating firmware, reconnect the device and wait for its capabilities to load automatically

There is no manual device-data refresh action: Entropy checks firmware and loads device data automatically on connection

## A menu item is missing

Entropy hides features that the firmware does not expose

- Check the firmware version
- Connect the device and wait for all data to load
- Reconnect the device after flashing new firmware
- Confirm that the required capability is supported by this firmware

Missing RGB, Auto Shift, Combos, modules, Universal Symbols, or another page is expected when firmware does not advertise that feature

## Firmware update not found

The automatic check under **Layout → About device** is available only for supported Ergohaven RMK profiles

- If update rows are not shown, the connected firmware does not report a supported update profile
- **Published package not found** means Entropy could not find an exact ZIP for the device model and topology
- After a network error, verify access to GitHub and click **Check** again
- If automatic download is unavailable, find the package manually on the [Firmware](/firmware/) page

Entropy does not install the downloaded package automatically

## Changes are not saved

- Unlock the Vial device
- Wait for **Saved** before disconnecting
- Avoid starting several long operations at once over Bluetooth
- After a **Write failed** status, reconnect the device and try again
- Create a backup before importing a large layout again

## `.entlayout` import error

- Make sure the selected file is `.entlayout`, not an unrelated JSON file
- Do not edit the `format` and `version` fields manually
- Connect the target device before starting import
- Use exact mapping for the same model and universal mapping for another compatible geometry
- Review **Skipped** and **Firmware issues** in the report

Entropy creates an automatic backup of the current layout before applying the import

## Text Expander does not trigger

### General checks

- Enable **Text Expander**
- Keep Entropy running in the background
- Make sure the trigger starts with `:` or `;` and contains no spaces
- Confirm that the active application is not blacklisted
- Test with a simple single-line replacement

### Windows

Restart Entropy and test the rule in Notepad

### macOS

Grant Accessibility and Input Monitoring, then click **Restart event capture** in Backend setup

### Linux

Install IBus, add an **Entropy Text Expander** input source, and select it before typing the trigger

## A Universal Symbol produces the wrong character

1. Confirm that the key uses an action from **Universal** rather than a regular symbol
2. Open **Config → Live Features** and check Layout Sync
3. Press `Sync` once
4. Check `macOS` mode: off on Windows/Linux and on for macOS
5. Repeat the test in English and Russian layouts

### macOS: the selected keyboard type is not applied

Temporarily disconnect other external HID devices, including Bluetooth mice and USB receivers, and repeat keyboard type setup through the macOS Keyboard Setup Assistant. The assistant may change another device's entry. Restart the keyboard after setup

See [Universal Symbols](../universal-symbols) for details

## Collecting diagnostics

1. Open **Config → App settings**
2. Enable **Diagnostics**
3. Reproduce the issue
4. Disable diagnostics after testing

When asking for help, include:

- Entropy version from **About Entropy**
- Operating system and desktop environment
- Device model and firmware version from **About device**
- Connection type: USB or Bluetooth
- Steps leading to the issue
- Error message and diagnostics log

Remove usernames, local paths, and other private data from logs before sharing them
