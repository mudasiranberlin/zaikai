function cartitems() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/cart-items')
            .then((response) => {
                console.log(response.data);
                setCart(response.data)
            })
    }, [])
}