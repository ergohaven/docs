---
title: Troubleshooting
compact_steps: true
---

{{< callout type="info" >}}
  This article covers common issues with Ergohaven products and how to resolve them. The article is continuously updated, and you are welcome to contribute by *editing the page on GitHub*.
{{< /callout >}}

## Initial Diagnostics

{{< callout type="important" >}}
Initial diagnostics are recommended to rule out common issues unrelated to the electronics of Ergohaven products.
{{< /callout >}}

{{% steps %}}

### Switch Devices

Check whether the issue occurs on another device (PC, laptop, tablet, smartphone, etc.). If using a USB hub, try connecting directly to the device or switching to a different USB port.

### Switch Operating Systems

Check whether the issue occurs on a different operating system (Windows, macOS, Linux, etc.).

### Switch Connection Interface

If using a wired connection between the halves or to your computer, replace the cable between the halves or to the computer.

### Reset to Factory Settings / Update Firmware

Flash your Ergohaven device with the standard firmware.

### Update Drivers

Reinstall the USB or Bluetooth driver on your device (PC, laptop, etc.).

{{< callout type="info" >}}
  Windows built-in drivers do not always work correctly with USB and Bluetooth devices. Use drivers provided by the device manufacturer.
{{< /callout >}}

{{% /steps %}}

## Key Press Issues

{{< details title="A key does not register or registers intermittently" closed="true" >}}

The issue may be related to the switch or the hot-swap socket. To identify the cause:

{{% steps %}}

### Remove the switch

**Remove the switch** from the problematic position using a switch puller

### Inspect the switch pins

**Inspect the switch pins** — make sure they are not bent or broken

### Inspect the socket

**Inspect the socket** — check for bent contact leaves inside

### Test with a working switch

**Insert a known-working switch** into the problematic position:
- Problem is gone → the original switch is faulty, replace it
- Problem persists → the socket is faulty, contact support

{{% /steps %}}


{{< callout type="warning" >}}
Never insert a switch with a bent pin — it may damage the socket.
{{< /callout >}}

{{< /details >}}

{{< details title="Multiple consecutive keys are not working" closed="true" >}}

If a group of adjacent keys is not working, the issue is most likely with a row or column in the matrix.

{{% steps %}}

### Check switch seating

Make sure all switches in that area are fully seated in their sockets

### Inspect the PCB

Check whether any debris or liquid has gotten under the PCB

### Reset the settings

Reset to factory settings and test again

### Contact support

If the issue persists — contact support for PCB diagnostics

{{% /steps %}}


{{< /details >}}

## Wireless Connection

{{< details title="Device does not appear in the Bluetooth list" closed="true" >}}

{{% steps %}}

### Charge the device

Charge the device to rule out a depleted battery

### Reset the Bluetooth profile

Clear the selected Bluetooth profile on the device and remove its previous pairing from the PC if it is still present

### Try another device

Check whether the device can connect to another PC, phone, or other compatible device

### Perform a cold reset of the PC

Shut down the computer, disconnect its power supply for 30–60 seconds, and discharge residual power by pressing the power button

### Flash the settings reset firmware

Reflash the device using the settings reset firmware

{{% /steps %}}

{{< /details >}}

{{< details title="Dual boot — multiple operating systems on one computer" closed="true" >}}

**One Bluetooth profile for all operating systems**

{{% steps %}}

### Select a profile

Select the Bluetooth profile you want to use across all operating systems on the keyboard

### Pair the keyboard

Pair the keyboard in one operating system, then in the other, using the same keyboard profile

### Export the pairing data

In the operating system where you paired the keyboard last, export its Bluetooth pairing keys and parameters using a utility for that operating system

### Import the data into the other OS

Boot into the other operating system and import the saved data using a compatible Bluetooth key transfer utility

### Repeat for additional operating systems

If the computer has more than two operating systems, repeat the import in each remaining system

### Check the connection

Check that the keyboard connects after switching operating systems without removing the device or pairing it again

{{% /steps %}}
Choose a utility that supports your operating system version and Bluetooth Low Energy — BLE. Transfer the complete pairing data, including keys and identity parameters, rather than just the MAC address

**A separate Bluetooth profile for each operating system**

{{% steps %}}

### Pair in the first OS

Boot into the first operating system, select an unused keyboard profile and pair the keyboard

### Pair in the second OS

Boot into the second operating system, select another unused keyboard profile and pair the keyboard

### Switch profiles with the OS

When switching operating systems, switch the keyboard to the corresponding profile

### If the connection breaks

If pairing in one operating system breaks the connection in the other, transfer the pairing keys using the steps above

{{% /steps %}}
{{< /details >}}

## Software Issues

{{< details title="Trackball: poor pointer accuracy, jerky cursor movement" closed="true" >}}

{{< callout type="info" >}}

**Enhanced pointer precision** (also known as mouse acceleration) is a feature that changes cursor speed depending on how fast you move the mouse. When using a trackball, it is often disabled for predictable, linear movement.
  
{{< /callout >}}

{{< tabs items="Windows,macOS,Linux" >}}
  {{< tab >}}

In Windows, this feature is called **"Enhance pointer precision"**. To disable it:

{{% steps %}}

### Open Settings

Open **Settings** (press `Win + I`)

### Open mouse settings

Go to **Bluetooth & devices** → **Mouse**

### Open additional settings

On the right side, click **Additional mouse settings**

### Select Pointer Options

In the "Mouse Properties" window, go to the **Pointer Options** tab

### Disable enhanced precision

Under **Motion**, uncheck **"Enhance pointer precision"**

### Save the changes

Click **Apply**, then **OK**

{{% /steps %}}


> **Note:** Changes take effect immediately. You can also adjust the **Pointer speed** slider here if needed.

  {{< /tab >}}
  {{< tab >}}

The method depends on your macOS version.

### For macOS Sonoma and later:
{{% steps %}}

### Open System Settings

Open the Apple menu () → **System Settings**

### Select Mouse

In the sidebar, select **Mouse**

### Open advanced settings

Click the **Advanced** button

### Disable acceleration

Toggle **Pointer acceleration** to **Off**

{{% /steps %}}


### For older versions of macOS:
{{% steps %}}

### Open Terminal

Open **Terminal** (Finder: `Applications` → `Utilities`)

### Run the command

Enter the following command:
```bash
defaults write .GlobalPreferences com.apple.mouse.scaling -1
```
and press Enter

### Restart your session

Log out or restart your computer to apply the changes

{{% /steps %}}


  {{< /tab >}}
  {{< tab >}}

### For GNOME (Ubuntu, Fedora, etc.):
{{% steps %}}

### Open Terminal

Open **Terminal**

### Disable acceleration

Enter the following command to disable acceleration:
```bash
gsettings set org.gnome.desktop.peripherals.mouse accel-profile flat
```

### Check the setting

To verify, run:
```bash
gsettings get org.gnome.desktop.peripherals.mouse accel-profile
```
The output should show `flat`

{{% /steps %}}


### For KDE Plasma:
Open **System Settings** → **Input Devices** → **Mouse** and set **Acceleration profile** to **Flat**.

  {{< /tab >}}
{{< /tabs >}}

{{< /details >}}

<!--
## Model-Specific Issues

{{< details title="Imperial44" closed="true" >}}

{{< /details >}}

{{< details title="Imperial44 – Wireless Edition" closed="true" >}}

{{< /details >}}

{{< details title="K:03" closed="true" >}}

{{< /details >}}

{{< details title="K:03 – Wireless Edition" closed="true" >}}

{{< /details >}}

{{< details title="Velvet" closed="true" >}}

{{< /details >}}

{{< details title="Velvet v3 – Wireless and UI Edition" closed="true" >}}

{{< /details >}}

{{< details title="Space Mission 30" closed="true" >}}

{{< /details >}}

{{< details title="High Plains Drifter v2" closed="true" >}}

{{< /details >}}

{{< details title="Macropad" closed="true" >}}

{{< /details >}}

{{< details title="Qube" closed="true" >}}

{{< /details >}}

{{< details title="Trackball Mini" closed="true" >}}

{{< /details >}}

{{< details title="Trackball Royale" closed="true" >}}

{{< /details >}}
-->

## If Nothing Helped

Contact Ergohaven support — write to [@Andrey_ergohaven](https://t.me/Andrey_ergohaven) with a description of the issue and, if possible, a photo or video. For warranty cases, an order number will be required.

{{< cards >}}
  {{< card link="https://t.me/Andrey_ergohaven" title="Ergohaven Support" subtitle="Message @Andrey_ergohaven on Telegram" icon="chat" >}}
  {{< card link="https://t.me/c/1464748383/8323" title="Community" subtitle="English chat in the Telegram group" icon="user-group" >}}
{{< /cards >}}
