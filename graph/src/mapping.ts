import {OptionOffer as OptionOfferEvent} from '../generated/OptionsMarket/OptionsMarket'
import {OptionOffer} from '../generated/schema'

export function handleNewOptionOffer(event: OptionOfferEvent): void {
  let offer = new OptionOffer(event.params.orderId.toHex())
  offer.orderId = event.params.orderId
  offer.token = event.params.token.toHexString()
  offer.seller = event.params.seller.toHexString()
  offer.amountSelling = event.params.amountSelling
  offer.expiry = event.params.expiry
  offer.strikePrice = event.params.strikePrice
  offer.isCallOption = event.params.isCallOption
  offer.save()
}
