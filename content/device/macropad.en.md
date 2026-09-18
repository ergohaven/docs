---
title: "Macropad"
sidebar:
  exclude: true
---

![image](/images/layouts/macropad_ru.png)  

Macropad is a wired, programmable mechanical macropad with an encoder and a hot-swap system for quick replacement of MX-compatible switches.

## Macropad hardware

{{% details title="Macropad v3" closed="true" %}}
![image](/images/macropad/macropad_v3.png)
1. RESET button
2. BOOT button
3. Silicone feet
4. Service cutout/window for disassembling the macropad case
5. USB‑C port
6. 240×280 IPS display
7. Encoder
{{% /details %}}

{{% details title="Macropad v2" closed="true" %}}
![image](/images/macropad/macropad_v2.png)
1. BOOT button
2. RESET button
3. Silicone feet
4. Service cutout/window for disassembling the macropad case
5. USB‑C port
6. 240×280 IPS display
7. Encoder
{{% /details %}}

## Connection
- The macropad works with devices running Windows, macOS, Linux, Android, and iOS.
- The macropad connects via Plug and Play (PnP); no additional driver installation is required.
- When connecting to a device, make sure the USB‑C cable is firmly inserted into the macropad’s port.

## Macropad setup

Use [Entropy](https://entropy.tools/) to configure M4CR0Pad v3. Connect the macropad to your computer via USB and launch the application

Entropy writes changes to the device automatically — there is no separate save button

{{% details title="Select M4CR0Pad v3 in Entropy" closed="true" %}}

On the start screen, select **M4CR0Pad v3 (USB)**

![Selecting M4CR0Pad v3 in Entropy](/images/macropad/macropad_v3_entropy_device_selection_en.png)

- **M4CR0Pad v3 (USB)** — the macropad connected to the computer via USB
- **Device list** — all compatible devices currently detected by Entropy

{{% /details %}}

{{% details title="Configure keys and layers" closed="true" %}}

Open the **Layout** tab and click the key whose assignment you want to change

![M4CR0Pad v3 Key Picker](/images/macropad/macropad_v3_entropy_key_picker_en.png)

- **Basic**, **Symbols**, **Mods**, **Special**, **RGB**, and **Custom** — categories of available actions
- **QWERTY** — the virtual keyboard arrangement shown in the picker; it does not change the operating-system input layout
- **Keys in the main area** — the new action for the selected macropad key

Use the arrows beside the layer name to switch layers

![Switching M4CR0Pad v3 layers](/images/macropad/macropad_v3_entropy_layer_switch_en.png)

- **Layer number and name** — the layer currently being edited
- **Left and right arrows** — switch to the previous or next layer
- **Keys on the layout** — assignments that apply only to the selected layer

To rename a layer, click its name and enter up to 12 characters. Press **Enter** or click outside the field to save, or press **Esc** to cancel

![Renaming an M4CR0Pad v3 layer](/images/macropad/macropad_v3_entropy_layer_name_en.png)

{{% /details %}}

{{% details title="Configure the encoder" closed="true" %}}

Open **Config** → **Encoders** and enable **Encoder 1**

![Showing the M4CR0Pad v3 encoder](/images/macropad/macropad_v3_entropy_encoder_visibility_en.png)

- **Encoder 1** — shows or hides the encoder zones on the layout; the toggle does not disable the physical encoder or remove its assignments

Return to the **Layout** tab and click the required encoder zone

![M4CR0Pad v3 encoder assignments](/images/macropad/macropad_v3_entropy_encoder_layout_en.png)

- **Upper zone** — the action for turning the encoder clockwise
- **Center zone** — the action for pressing the encoder
- **Lower zone** — the action for turning the encoder counterclockwise

In the screenshot, these zones are assigned **Volume Up**, **Mute**, and **Volume Down**. Encoder assignments are configured separately for each layer

{{% /details %}}

{{% details title="Configure RGB lighting" closed="true" %}}

Open **Config** → **RGB**

![M4CR0Pad v3 RGB settings](/images/macropad/macropad_v3_entropy_rgb_en.png)

- **Enable** — turns RGB lighting on or off
- **Effect** — selects a static mode or animation
- **Color** — sets the color for modes that support manual color selection
- **Speed** — adjusts the animation speed of the selected effect
- **Brightness** — adjusts overall RGB lighting brightness

> Macropad v1 and v2 do not have RGB lighting

{{% /details %}}

{{% details title="Configure the lighting timeout" closed="true" %}}

Open **Config** → **Layer LEDs**

![M4CR0Pad v3 lighting timeout](/images/macropad/macropad_v3_entropy_layer_led_timeout_en.png)

- **LED timeout** — the idle time before the lighting turns off; a value of zero disables the timeout

{{% /details %}}

{{% details title="Configure the main display screen" closed="true" %}}

Open **Config** → **Display** → **Main screen**

![M4CR0Pad v3 main display screen](/images/macropad/macropad_v3_entropy_display_main_en.png)

- **Interface color** — the color of labels, key outlines, and pictograms on the main screen
- **Background color** — the background color of the main screen
- **Brightness** — overall display brightness in the main mode
- **Button style** — the shape of the keys on the macropad display

{{% /details %}}

{{% details title="Configure the standby screen" closed="true" %}}

Open **Config** → **Display** → **Standby screen**

![Upper standby screen settings for M4CR0Pad v3](/images/macropad/macropad_v3_entropy_display_standby_top_en.png)

- **Layer and language** — shows the current layer name and operating-system input language
- **Clock** — shows the time supplied by Entropy
- **Date** — shows the current date supplied by Entropy
- **Track text** — shows the track title and artist; long text scrolls across the screen
- **Color** — the shared color of text and pictograms on the standby screen
- **Brightness** — overall brightness of the standby screen, including its background and text
- **Font** — the shared font for the layer name, language, clock, date, and track text
- **Image or animation** — uploads an image or GIF for the standby background; **Clear** removes the uploaded background
- **Image dimming** — fades the uploaded image: 0% keeps its original brightness and 100% hides it

Scroll down to open the remaining settings

![Lower standby screen settings for M4CR0Pad v3](/images/macropad/macropad_v3_entropy_display_standby_bottom_en.png)

- **Standby background color** — the color behind the image and in its transparent areas
- **Clock size** — changes the size of the clock digits without resizing the other labels
- **Blinking separator** — enables or disables the blinking colon in the clock
- **Date format** — sets the order of the day, month, and year
- **Enter standby after** — the idle time before the standby screen appears
- **Turn display off after** — the idle time before the display turns off completely

The clock, date, input language, and track information update through Live Features while Entropy is running in the background

{{% /details %}}

{{% details title="Configure pictograms" closed="true" %}}

Open **Config** → **Display** → **Pictograms**

![M4CR0Pad v3 pictogram editor](/images/macropad/macropad_v3_entropy_pictograms_editor_en.png)

- **Choose action type** — selects **Macros** or **Tap Dance**
- **Choose macro** or **Choose Tap Dance** — selects the slot that receives the pictogram
- **Choose pictogram** — opens the library of built-in and saved pictograms
- **Pictogram name** — the custom pictogram name in the local library
- **35 × 35 editor** — creates a monochrome 35 × 35 pixel pictogram
- **Pencil** and **Eraser** — add or remove pixels
- **Import pictograms** and **Export pictograms** — restore or back up the local library as JSON
- **Clear** — clears the editor
- **Undo** — reverses the latest edit
- **Remove** — removes the selected custom pictogram from the local library
- **Save** — saves the pictogram to the local library and immediately assigns it to the selected Macro or Tap Dance slot

Use **Choose** to assign a different built-in or saved pictogram

![M4CR0Pad v3 pictogram library](/images/macropad/macropad_v3_entropy_pictograms_library_en.png)

- **Search pictograms** — filters built-in and saved pictograms by name
- **No pictogram** — removes the assignment from the selected Macro or Tap Dance slot
- **Pictogram tiles** — immediately assign the selected pictogram to that slot

{{% /details %}}

{{% details title="Configure Live Features" closed="true" %}}

Open **Config** → **Live Features**

![M4CR0Pad v3 Live Features](/images/macropad/macropad_v3_entropy_live_features_en.png)

- **Entropy background** — indicates whether the application must keep running to provide live data
- **Layout sync** — sends the active operating-system input language to the firmware; the toggle enables or disables the feature
- **Time sync** — sends local system time to the macropad
- **Volume sync** — sends the current system volume; the data source appears on the right
- **Media info** — sends the track title and artist; the active media-player integration appears on the right
- **Statuses on the right** — show whether each feature is ready or which integration is used; values depend on the operating system

No additional manual setup is needed when all required rows are ready

{{% /details %}}


## Firmware update

Firmware files and update instructions are available [here](https://docs.eh.industries/firmware/)

## Care and maintenance

- Periodically clean the case from dust and dirt with a dry or slightly damp cloth

{{< callout type="error" >}}
  Do not use aggressive cleaning agents (acetone, gasoline, solvents (646, white spirit), concentrated acids, or alkalis)!
{{< /callout >}}

{{< callout type="warning" >}}
  Do not allow liquid to enter the device!
{{< /callout >}}

## Support

The keypad comes with a *3-year warranty and service support*.

If you have any questions about setup, firmware, or operation, please contact [the Ergohaven Telegram group](https://t.me/c/1464748383/8323) or [knowledge base](https://docs.eh.industries/)
