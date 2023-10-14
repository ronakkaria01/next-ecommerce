import CurrencyDisplay from "../helpers/CurrencyDisplay"

export async function OrderSummary({ cart }) {
    const items = cart.items
    if(items.length == 0) return
    return (
        <>
            <div className="p-4 bg-slate-100">
                <h2 className="text-2xl">Order Summary</h2>
                <table className="table-fixed w-full mt-4">
                    <tbody>
                        <tr>
                            <th className="py-2 text-left">Subtotal</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.subtotal} />}</td>
                        </tr>
                        <tr>
                            <th className="py-2 text-left">Tax</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.taxes} />}</td>
                        </tr>
                        <tr>
                            <th className="py-2 text-left">Delivery</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.delivery} />}</td>
                        </tr>
                        <tr>
                            <th className="py-2 text-left">Total</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.total} />}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}