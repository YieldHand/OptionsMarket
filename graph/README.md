# Options Market Subgraph

## Example queries

Note, that the `expiry_gt` parameter should be set to current unix timestamp (measured in seconds since epoch) to query active offers.

### All active offers based on a token address
```
{
  optionOffers(where: {expiry_gt: 1628694955, token: "0xcbd7d7a2a54ea12412624b375e3bc5a11c8c1109"}) {
    id
    orderId
    token
    seller
    amountSelling
    expiry
    strikePrice
    isCallOption
  }
}
```

### All active offers based on a token and minimum amount
```
{
  optionOffers(where: {expiry_gt: 1628694955, token: "0xcbd7d7a2a54ea12412624b375e3bc5a11c8c1109", amountSelling_gte: 10}) {
    id
    orderId
    token
    seller
    amountSelling
    expiry
    strikePrice
    isCallOption
  }
}
```

### All active offers based on a token and strike price minimum
```
{
  optionOffers(where: {expiry_gt: 1628694955, token: "0xcbd7d7a2a54ea12412624b375e3bc5a11c8c1109", strikePrice_gte: 10}) {
    id
    orderId
    token
    seller
    amountSelling
    expiry
    strikePrice
    isCallOption
  }
}
```

### All active offers based on a token and strike price maximum
```
{
  optionOffers(where: {expiry_gt: 1628694955, token: "0xcbd7d7a2a54ea12412624b375e3bc5a11c8c1109", strikePrice_lte: 10}) {
    id
    orderId
    token
    seller
    amountSelling
    expiry
    strikePrice
    isCallOption
  }
}
```

### All active offers based on a token and both strike price minimum and maximum
```
{
  optionOffers(where: {expiry_gt: 1628694955, token: "0xcbd7d7a2a54ea12412624b375e3bc5a11c8c1109", strikePrice_gte: 10, , strikePrice_lte: 30}) {
    id
    orderId
    token
    seller
    amountSelling
    expiry
    strikePrice
    isCallOption
  }
}

---
For more details on available query parameters, see: https://thegraph.com/docs/developer/graphql-api
