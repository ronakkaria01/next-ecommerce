import CurrencyDisplay from "../helpers/CurrencyDisplay"

export async function CheckoutSummary({ cart }) {
    const items = cart.items
    if (items.length == 0) return
    return (
        <>
            <div className="p-4 bg-slate-100">
                <ul>
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>
                                {item.quantity} x {item.post_title}
                            </span>
                            <span>
                                <CurrencyDisplay price={item.subtotal} />
                            </span>
                        </li>
                    ))}
                </ul>
                <table className="table-fixed w-full mt-8">
                    <tbody>
                        <tr>
                            <th className="py-2 text-left">Subtotal</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.subtotal} />}</td>
                        </tr>
                        <tr className="border-t-2">
                            <th className="py-2 text-left">Tax</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.taxes} />}</td>
                        </tr>
                        <tr>
                            <th className="py-2 text-left">Delivery</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.delivery} />}</td>
                        </tr>
                        <tr className="border-t-2">
                            <th className="py-2 text-left">Total</th>
                            <td className="py-2 text-right">{<CurrencyDisplay price={cart.total} />}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}