# Elementary Code コピーガード実機確認（2026-08-21）

こーちゃん。完全コピー防止ではない。簡易ガード確認。

## 環境

- URL: `http://192.168.1.9:8765/`（Mac ローカル配信。ドメイン未公開）
- iPhone 16e … Safari 起動・ページ GET 200（端末 LAN）
- iPhone 13 mini … Safari 起動・ページ GET 200（端末 LAN）
- Mac ブラウザ … ガード動作を CDP で確認

## 結果（事実）

| 項目 | 結果 |
|---|---|
| 右クリック（本文） | defaultPrevented = true |
| コピー（本文） | defaultPrevented = true |
| 本文の文字選択 CSS | `user-select: none` |
| 入力欄の選択 | `user-select: text`（シリアル入力可） |
| 入力欄のコピー | 妨げない（prevented = false） |
| sp7（アプリ側認証が正） | 表示あり |
| HTML に秘密らしき文字列 | なし |
| 重要画像の透かし | いま画像 0 枚のためラッパー 0（画像追加時に効く） |
| System Status | PREPARING / SERVER UNAVAILABLE |

## 限界（事実）

- iOS Safari の長押しスクショ／共有は OS 側なので、ページだけで止めきれない
- 見た目コピーは防げても、AIR 毎回認証・履歴発信はアプリ側が正（意図どおり）
