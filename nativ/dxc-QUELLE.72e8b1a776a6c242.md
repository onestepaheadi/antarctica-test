# DirectX Shader Compiler (DXC)

`dxcompiler.dll` und `dxil.dll` (x64) für den schnellen Start unter DirectX 12: liegen sie neben `shootergame.exe`, übersetzt wgpu
die Shader mit DXC statt mit FXC (erstes Bild nach gut 6 statt gut 45 s, gleiche Bildzeit; `shootergame/pruefe-start-stabilitaet.mjs`).
Ohne sie oder wenn DXC scheitert, nimmt das Spiel FXC (`crates/render/src/grafik.rs`, `dxc_wahl`).

- Version: v1.9.2609 (Release vom 29.09.2026), Datei `dxc_2026_09_29.zip`, daraus `bin/x64/dxcompiler.dll` und `bin/x64/dxil.dll`
- Quelle: https://github.com/microsoft/DirectXShaderCompiler/releases/tag/v1.9.2609
- Geladen: 21.11.2026; SHA-256 der Zip `ad31b1fc8443175d204f77a611fdb3ef2ec42759bdc2f1167368de24a4a7e7f1`
- SHA-256 `dxcompiler.dll` `0689e2fee0a1c9df8662a59680469f24e2a3ad7ce6bbbcc9284f7a83172bfc59`
- SHA-256 `dxil.dll` `64be2368211d257a038a7d4ea6bb3e24c878eb8d588c7b8414fccf759b69c2ac`
- Signatur: beide Authenticode-signiert von Microsoft Corporation (gültig geprüft am 21.11.2026)

## Lizenz

`LICENSE-MS.txt` (Microsoft Software License Terms, DirectX Shader Compiler) erlaubt, die Bibliotheken als „Distributable Code“ mit
einer eigenen Anwendung weiterzugeben, unverändert und nur unter Windows. Pflichten daraus: die Anwendung fügt wesentliche eigene
Funktion hinzu, keine Marken von Microsoft, Hinweise nicht entfernen. Die quelloffenen Teile stehen unter `LICENSE-LLVM.txt` (LLVM,
University of Illinois/NCSA) und `LICENCE-MIT.txt`. Alle drei Dateien gehen mit den DLLs in die Auslieferung
(`scripts/ausgabe-bauen.mjs`).

Aktualisieren: neue Release von der Seite oben laden, die beiden x64-DLLs und die Lizenzdateien hier ersetzen, diese Datei anpassen.
