---
title: "RuEn mode"
weight: 2
---

This mode is designed to

- place punctuation marks in the same places for Russian and English languages,
- enter characters from the English layout when printing in Russian,
- switch the layout to English or Russian using separate keys.

This works due to the fact that the keyboard remembers the current layout, and if you need to enter a character that is not in the Russian layout, it automatically switches the layout, and after entering the character, it returns the layout back.

The main advantage of this approach is that there is no need to install additional software or non-standard layouts into the system.

The main disadvantage is the need to maintain the same layout state in the keyboard and in the system. More details on how to ensure this will be discussed below.

The RuEn mode keys can be found in the Vial program in the User tab. All keys in this mode begin with the word RuEn. To use them, you need to add them to your layout (in any convenient layer).

![image](/images/ruen/ruen-all.png)


## Presets

Below are simple procedures for pre-configuring the operating system and keyboard for RuEn mode. These are the default settings, and if this is your first time setting up RuEn, it is recommended to go this route.

However, in some cases the default settings may not suit you:
- if your system uses a non-standard key combination to change the layout, see section [RuEn M0](#ruen-m0) and [RuEn M1M2](#ruen-m1m2);
- if you work a lot with remote machines (for example, via RDP) and you often need to synchronize the remote machine’s layout with the keyboard layout, see section [RuEn M1M2](#ruen-m1m2);
- if you need to have an individual layout for each window, or if for some reason you often experience desynchronization of the keyboard layout and the system, or it is very inconvenient for you to use the `RuEn Toggle`, `RuEn En`, `RuEn Ru` keys for switching layouts, see section [Using the qmk-hid-host program](#using-qmk-hid-host program).

It is still recommended to read this and the next section to get a general understanding of the RuEn mode, and then proceed to more complex settings.

### Windows

No special pre-configuration is required. Need to make sure that
- the `Win+Space` key combination actually switches the layout (for Windows 8 and newer this should be the default),
- no individual layout is used for each window.

### Linux

Need to make sure that
- the `Win+Space` key combination actually switches the layout (for Ubuntu this is enabled by default, for other distributions it may require configuration),
- no individual layout is used for each window.

### Mac

You need to do the following:
- install the Russian PC layout for Russian,
- select the switching method `Ctrl+Space`,
- enable Mac mode on the keyboard (by default, in place of the `B` key in the yellow layer, also known as the `Toggle Ctl Gui` button from the Quantum tab of the Vial program).


## Synchronization and switching layouts

In order for the keyboard to switch layouts correctly, the keyboard layout must match the layout on the system. To do this, you need to follow two rules:

1) First you need to make sure that the layout of the system and the keyboard match; in other words, you need to synchronize the layout in the system and in the keyboard.
2) And then, so that the synchronization does not get lost, to switch the layout, use **only** special keys: `RuEn Toggle`, `RuEn Ru`, `RuEn En`.

You can check your keyboard layout in the following ways:

- the current keyboard layout can be seen on the screen (PlanetaV2, as well as K:02, K:03, Imperial44 when the Modern or Minimalistic screen mode is selected);
- if there is no screen, then you can determine the layout experimentally: select the English layout in the system and press the `RuEn.` key, if you go to `.`, then the keyboard has an English layout, and if you go to `yu`, then the keyboard has a Russian layout layout;
- You can also use the following consideration: when turned on, the keyboard is set to the English layout.

If the layout in the system and the keyboard do not match, it is necessary to synchronize. This can be done in various ways:
- press the `RuEn Sync` key once; in this case, the keyboard will change the internal state without sending anything to the system;
- change the layout in the system using the standard combination for changing the layout;
- change the layout in the system by clicking the mouse on the layout icon.

After you have made sure that the keyboard layout is the same as in the system, you need to check that the `RuEn Toggle` key simultaneously switches the layout in both the system and the keyboard.

Also in RuEn mode there is a pair of keys for switching the layout directly to the desired language: `RuEn En` and `RuEn Ru`. The `RuEn En` key switches to the English layout if the Russian layout is currently used and does not change anything if the English layout is already installed. The `RuEn Ru` key does the same thing exactly the opposite: it turns on the Russian layout only if the English one is currently installed.

It is recommended to relearn how to use the `RuEn En` / `RuEn Ru` keys to switch layouts. In this case, before you start writing, you can immediately set the desired layout. Over time, this will be done automatically, and it is faster than looking at the layout indicator in the system or writing something, then deleting it, switching the layout, and typing it again.

At this point, the basic setup can be considered complete. What follows is background information about the RuEn mode keys and a description of advanced modes.

## Description of keys

### Layout switching keys

#### RuEn Sync

Switches the state of the keyboard layout without sending any sequences to the system. A single press changes the state from English to Russian or from Russian to English.

#### RuEn Toggle

Switches the internal state and sends the layout change combination to the system.

#### RuEn En

For the [RuEn Dflt](#ruen-dflt), [RuEn M0](#ruen-m0) modes it works as follows:
- if the keyboard has a Russian layout, then it sends a combination to change the layout and changes the internal state to the English layout,
- if the keyboard has an English layout, it does nothing.

For the [RuEn M1M2](#ruen-m1m2) mode, the operating logic changes slightly:
- if the keyboard has a Russian layout, then it sends a combination to change the layout to English (macro `M1`) and changes the internal state to the English layout,
- if the keyboard has an English layout, then it sends a combination to change the layout to English (macro `M1`), the internal state remains on the English layout.

#### RuEn Ru

For the [RuEn Dflt](#ruen-dflt), [RuEn M0](#ruen-m0) modes it works as follows:
- if the keyboard has an English layout, it sends a combination to change the layout and changes the internal state to the Russian layout,
- if the keyboard has a Russian layout, it does nothing.

For the [RuEn M1M2](#ruen-m1m2) mode, the operating logic changes slightly:
- if the keyboard has an English layout, then it sends a combination to change the layout to Russian (macro `M2`) and changes the internal state to the Russian layout,
- if the keyboard has a Russian layout, then it sends a combination to change the layout to Russian (macro `M2`), the internal state remains on the Russian layout.

### Layout switching mode settings

#### RuEn Dflt

When you press this key, the keyboard uses the `Win+Space` combination to change the layout if Mac mode is not selected. In Mac mode (turned on by the `Toggle Ctl Gui` key combination from the Quantum tab), the keyboard will send the `Ctl+Space` combination to switch layouts.

This mode is enabled by default. Pressing the `RuEn Dflt` key is necessary if another layout switching mode was previously enabled.

#### RuEn M0

Allows you to change how the default layout is switched. To configure this mode, you need to perform the following steps:

1) Set in the `M0` macro the necessary sequence for switching the layout. For testing, you can temporarily place the `M0` macro in the current layout to check its operation.
2) Press the `RuEn M0` key. After this, the keyboard will send the `M0` macro instead of the default combination for switching layouts.

This switching method can be useful in different cases:
- switching the layout in the system does not coincide with the default one;
- there are problems with the default switching: for example, Windows and Ubuntu, when switching, briefly shows a special window with a choice of layouts, which draws the focus to itself for a few milliseconds; experimentally, in the default method, delays were selected that were sufficient for the focus of this window to disappear; Unfortunately, there is no guarantee that your system will have enough of these delays;
- or vice versa: the pop-up window with the layout in Windows is annoying and you want to make sure that the layout is switched using the `Shift+Alt` combination.

#### RuEn M1M2

Allows you to set separate macros for switching layouts to English and Russian. To configure this mode, you need to perform the following steps:
1) Configure in the system a combination of keys to enable the English layout and a combination of keys to enable the Russian layout.
2) Set the combination to switch to the English layout in the `M1` macro.
3) Set the combination to switch to the Russian layout in the `M2` macro.
4) It is also advisable to temporarily place these macros on the current layout and debug their operation.
5) Press the `RuEn M1M2` key. After this, the keyboard, instead of the default combination to switch the layout, will send the macro `M1` to enable the English layout and the macro `M2` to enable the Russian layout.

This mode is useful because the keyboard sends the language change combination regardless of the state of the internal layout. Thus, it turns out that there is no need to synchronize the internal state and the layout in the system: just press `RuEn Ru` or `RuEn En` once and the internal state will coincide with the layout in the system (the `RuEn Sync` key is not needed in this case). The `RuEn Toggle` key will also work, but take a closer look at the pair of `RuEn Ru` and `RuEn En` keys (believe me, it’s very convenient once you get used to it).

This mode can also be especially useful if you have to type text on remote machines, each of which may have its own layout state.

### Characters available in Russian and English layouts

When typing these characters, the layout does not switch, because they are available in both Russian and English layouts:

- `RuEn .`
- `RuEn ,`
- `RuEn ;`
- `RuEn :`
- `RuEn "`
- `RuEn ?`
- `RuEn /`

### Characters from the English layout

When typing these characters from the Russian layout, it automatically switches to the English layout, and after entering the character, it switches back to Russian. When typing these characters from the English layout, the layout is not switched.

- `RuEn [`
- `RuEn ]`
- `RuEn {`
- `RuEn }`
- `RuEn <`
- `RuEn >`
- ``RuEn ` ``
- `RuEn ~`
- `RuEn @`
- `RuEn #`
- `RuEn $`
- `RuEn ^`
- `RuEn &`
- `RuEn |`

### Character from Russian layout

The only character that is present in the Russian layout and is absent in the English one:
- `RuEn №`

Entering this character works similarly to the previous point, only temporarily switches to the Russian layout if the current layout is English.

## Additional features

### Using the qmk-hid-host program

This program runs on the computer and sends various information to the keyboard:
- current time,
- current volume level,
- information about the artist and the name of the playing media,
- current window layout.

The program is available for Windows and Linux OS, you can download it from [link](https://github.com/ergohaven/qmk-hid-host/releases/tag/latest). This is a fork that changes the default settings so that Ergohaven keyboards do not have to edit the settings file. Many thanks to the author of [the original program](https://github.com/zzeneg/qmk-hid-host) zzeneg (he is in our chat).

For the RuEn mode, the key here is that when using this program:
1) the need to monitor the synchronization of the layout in the keyboard and in the system is eliminated
2) it becomes possible to use an individual layout for each window.

### CAPS WORD mode

The CAPS WORD mode (activated by the dedicated CAPS WORD key) allows you to enter one word in upper case and automatically exit this mode by pressing the character separating the words. In RuEn mode, CAPS WORD mode is supported: characters that are word separators in the English layout (such as `ZHEKHYOBYU`) do not interrupt CAPS WORD mode if typed in the Russian layout.

### RuEn word mode

This mode is somewhat similar to the CAPS WORD mode. It is useful when typing in the Russian keyboard, because... provides the ability to enter one word in the English layout and after entering it automatically switch to the Russian layout.

The end of a word in RuEn word mode is determined by pressing Space, Enter, Escape, Minus.

In addition, if the Shift key was held down before pressing `RuEn word`, the CAPS WORD mode is also enabled in RuEn word.

If you often have to type technical or mathematical texts in Russian, replete with English inserts, this mode can be a good help.

Examples of similar text
```md
IP address, TCP/IP stack, OSI model
variable name `helloWorld`
LaTeX equations of the form $x^2+y^2=0$
```

### RuEn Mod

Switches the layout twice: when pressed and when released. Thus, by holding this key, you can enter characters and sequences from another layout.

### RuEn Store / RuEn Revert

Sometimes you need to enter a macro in a specific layout and then return to the original layout. To do this, you need to insert `RuEn Store` at the beginning of the macro, and insert `RuEn Revert` at the end.

### Entering Unicode characters

*Expect in the next firmware.*
