import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

// for (let i = 0; cartList.length; i += 1) {
//   total += cartList[i].price * cartList[i].quantity
// }

const CartSummary = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [updatepayment, setpayment] = useState(false)

  const handlePaymentMethodChange = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(items => {
          total += items.price * items.quantity
        })

        const checkPayment = () => {
          if (selectedPaymentMethod !== '') {
            setpayment(true)
          }
        }

        return (
          <div className="totalOrdervalue">
            <h1 className="orderPara">
              Order Total: <span className="span">Rs {total}/-</span>
            </h1>
            <p>items in cart : {cartList.length}</p>
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button className="button" type="button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="popupTab">
                      {!updatepayment && (
                        <>
                          <h1>Checkout</h1>
                          <h3>Order Summary</h3>
                          <hr />
                          <p>items in cart : {cartList.length}</p>
                          <h4 className="orderPara paraColor">
                            Order Total:{' '}
                            <span className="span paraColor">Rs {total}/-</span>
                          </h4>
                          <hr />
                          <div>
                            <p>Select Payment Method:</p>
                            <div>
                              <input
                                type="radio"
                                id="card"
                                value="card"
                                checked={selectedPaymentMethod === 'card'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="card">Card</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="netBanking"
                                value="netBanking"
                                checked={selectedPaymentMethod === 'netBanking'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="netBanking">Net Banking</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="upi"
                                value="upi"
                                checked={selectedPaymentMethod === 'upi'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="upi">UPI</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="wallet"
                                value="wallet"
                                checked={selectedPaymentMethod === 'wallet'}
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="wallet">Wallet</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="cashOnDelivery"
                                value="cashOnDelivery"
                                checked={
                                  selectedPaymentMethod === 'cashOnDelivery'
                                }
                                onChange={handlePaymentMethodChange}
                              />
                              <label htmlFor="cashOnDelivery">
                                Cash on Delivery
                              </label>
                            </div>

                            {selectedPaymentMethod && (
                              <p>You selected: {selectedPaymentMethod}</p>
                            )}
                          </div>
                          <div className="buttonLayout">
                            <button
                              type="button"
                              className="button"
                              onClick={checkPayment}
                            >
                              Confirm Order
                            </button>
                            <button
                              type="button"
                              className="button"
                              onClick={() => close()}
                            >
                              Close
                            </button>
                          </div>
                        </>
                      )}
                      {updatepayment && (
                        <p className="successPara">
                          Your order has been placed successfully
                        </p>
                      )}
                    </div>
                  </>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
