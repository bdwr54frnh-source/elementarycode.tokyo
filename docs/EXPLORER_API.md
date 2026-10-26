# Explorer API（公開用・仕様のみ）

公開前。実装サーバー未接続。真正判定を客户端で作らない。

## 正

- 公式検証先は `https://elementarycode.tokyo` のみ
- 真正性は公式サーバーへのリアルタイム照合結果だけを正とする
- シリアル番号だけでは所有権を証明しない
- 公開結果に所有者の個人情報を載せない
- `elementaryCode` は `"VERIFIED"` のみ。完全値は返さない
- 公開用 `logicVersionPublic` は `EC-PUBLIC-1`。内部生成ロジックの版は返さない

## エンドポイント

```
GET https://elementarycode.tokyo/v1/public/explorer?q={query}
```

HTTPS のみ。レート制限あり。

## プレビュー

サーバー未接続のため AUTHENTIC を出さない。  
`SERVER UNAVAILABLE` と「公式ドメインで確認してください」を出す。

## 禁止フィールド

ownerName, phone, email, deviceId, fullCode, secret, key, seed, formula, stopPoint, centisecond, pairId, internalLogicVersion
