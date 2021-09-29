import { useElements, useStripe } from "@stripe/react-stripe-js";
import Payment from "../../containers/Payment/Payment";

const PaymentElement = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  return <Payment stripe={stripe} elements={elements} />;
};

export default PaymentElement;