export default function AuthValidationErrors({ message, validationErrors }) {
    if (validationErrors == null) {
        return (
            <>
                <p>{message}</p>
            </>
        )
    }
    return (
        <>
            <ul>
                {Object.keys(validationErrors).map((field, index) => (
                    <li key={index}>
                        <ul>
                            {JSON.parse(validationErrors[field]).map((error, index) => (
                                <li key={index}>
                                    {error.message}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}