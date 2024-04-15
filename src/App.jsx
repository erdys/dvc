import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Components from Chart.js for creating bar charts
import { Bar } from 'react-chartjs-2'; // Library for Bar component
import axios from 'axios'; // HTTP requestes to API
import styles from './App.module.css'; // CSS styling module

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Registering components scale for Chart.js

function App() {
    // State hooks for managing: product data, filtering, and rendering state
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('all'); // Default category set to 'all'
    const [sort, setSort] = useState('price'); // Default sorting set to 'price'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null); // Using useRef to reference the chart component

    useEffect(() => {
        // useEffect to fetch product from API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                // Initial products and settings
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false); // Ending data loading
            } catch (error) {
                setError('Failed to fetch products'); // Showing error
                setLoading(false); // Ending data loading
            }
        };
        fetchProducts();
    }, []); // Empty dependecy for runs once time after initial render

    // Function to handle category change and sort
    const filterAndSortProducts = () => {
        let tempProducts = [...products]; // Create a copy of the products to avoid direct state mutation

        // Filter products only if the selected category is not 'all'
        if (category !== 'all') {
            tempProducts = tempProducts.filter(product => product.category === category);
        }

        // Choose sorting method based on the 'sort' variable value
        switch (sort) {
            case 'price-asc':
                tempProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                tempProducts.sort((a, b) => b.price - a.price);
                break;
            // Using localeCompare() ensures that titles are sorted in a way that is understandable and acceptable to users, regardless of the language in which the titles are written.
            case 'title-asc':
                tempProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                tempProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // No default sorting
                break;
        }
        setFilteredProducts(tempProducts); // Refresh products after change category  or sort
    };

    useEffect(() => {
        // useEffect to automatically update the list of displayed products
        filterAndSortProducts();
    }, [category, sort]); // Depends on category and sort state changes to render

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy(); // Destroy of the chart instance when the component is unmounted
                // Uncaught Error: Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID '' can be reused.
            }
        };
    }, []);

    return (
        <article className={styles.dashboard}>
            <h1 className={styles.title}>Data Visualisation Component</h1>

            {(loading || error) && (
                // Loading and error handling
                <div className={styles.alert}>
                    {loading ? <p>Loading...</p> : null}
                    {!loading && error ? <p>{error}</p> : null}
                </div>
            )}

            <section className={styles.box}>
                <div className={styles.boxGraph}>
                    <Bar
                        ref={chartRef}
                        data={{
                            labels: filteredProducts.map(product => product.title),
                            datasets: [
                                {
                                    label: 'Price',
                                    data: filteredProducts.map(product => product.price),
                                    backgroundColor: 'rgba(61, 90, 128, 0.2)',
                                    borderColor: 'rgba(61, 90, 128, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            responsive: true, // Included for RDW view
                            maintainAspectRatio: false, // AspectRatio must be false for RDW view
                            indexAxis: 'y', // Set main axis
                            scales: {
                                y: {
                                    beginAtZero: true, // Ensures that the Y-axis starts at 0
                                },
                            },
                        }}
                    />
                </div>
                <div className={styles.boxFilters}>
                    <div className={styles.filtersItem}>
                        <label className={styles.filterLabel}>Filter by Category:</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className={styles.filterSelect}>
                            <option value='all'>All</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                            <option value='jewelery'>Jewelery</option>
                            <option value='electronics'>Electronics</option>
                        </select>
                    </div>
                    <div className={styles.filtersItem}>
                        <label className={styles.filterLabel}>Sort by:</label>
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className={styles.filterSelect}>
                            <option value='price-asc'>Price (Low to High)</option>
                            <option value='price-desc'>Price (High to Low)</option>
                            <option value='title-asc'>Title (A to Z)</option>
                            <option value='title-desc'>Title (Z to A)</option>
                        </select>
                    </div>
                </div>
            </section>
        </article>
    );
}

export default App;
