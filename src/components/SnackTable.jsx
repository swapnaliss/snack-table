import React, { useState } from 'react';
import { Table, Form, Alert } from 'react-bootstrap';

const snacks = [
    {
        id: 1,
        product_name: "Granola Bar",
        product_weight: "21g",
        price: 299,
        calories: 150,
        ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"]
    },
    {
        id: 2,
        product_name: "Fruit and Nut Mix",
        product_weight: "73g",
        price: 749,
        calories: 353,
        ingredients: [
            "Almonds",
            "Cashews",
            "Dried Cranberries",
            "Dried Blueberries"
        ]
    },
    {
        id: 3,
        product_name: "Veggie Chips",
        product_weight: "28g",
        price: 279,
        calories: 130,
        ingredients: ["Sweet Potatoes", "Beets", "Kale", "Sea Salt"]
    },
    {
        id: 4,
        product_name: "Protein Balls",
        product_weight: "100g",
        price: 499,
        calories: 318,
        ingredients: ["Dates", "Almond Butter", "Protein Powder", "Chia Seeds"]
    }
];


const SnackTable = () => {
    const [searchText, setSearchText] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const filteredSnacks = snacks.filter((snack) => {
        const { product_name, ingredients } = snack;
        return (
            product_name.toLowerCase().includes(searchText) ||
            ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchText))
        );
    });

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedSnacks = filteredSnacks.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        if (columnA < columnB) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (columnA > columnB) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });


    console.log(filteredSnacks);
    return (
        <div className="container">
            <h1>Snacks Table</h1>
            <Form.Group controlId="searchForm">
                <Form.Control
                    type="text"
                    placeholder="Search by name or ingredients"
                    value={searchText}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')} className="clickable">
                            ID
                        </th>
                        <th onClick={() => handleSort('product_name')} className="clickable">
                            Product Name
                        </th>
                        <th onClick={() => handleSort('product_weight')} className="clickable">
                            Product Weight
                        </th>
                        <th onClick={() => handleSort('price')} className="clickable">
                            Price
                        </th>
                        <th onClick={() => handleSort('calories')} className="clickable">
                            Calories
                        </th>
                        <th onClick={() => handleSort('ingredients')} className="clickable">
                            Ingredients
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSnacks.map((snack) => (
                        <tr key={snack.id}>
                            <td>{snack.id}</td>
                            <td>{snack.product_name}</td>
                            <td>{snack.product_weight}</td>
                            <td>{snack.price}</td>
                            <td>{snack.calories}</td>
                            <td>{snack.ingredients.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {!filteredSnacks.length &&
                <Alert variant={"danger"}>
                    Your search - <span style={{ "color": "red" }}>{searchText}</span> - did not match any snack.
                </Alert>
            }
        </div>
    );
};

export default SnackTable