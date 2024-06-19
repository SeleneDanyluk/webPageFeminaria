import React, { useState } from 'react'
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SearchBook.css'

const SearchBook = ({ onSearch }) => {

    const [filter, setFilter] = useState("");

    const onHandleSearch = (e) => {
        setFilter(e.target.value);
        console.log(filter);
    };

    const onHandleSearchData = () => {
        onSearch(filter);
        setFilter("");
    };

    return (
        <div>
            <div className='search-container'>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Buscar"
                        className="me-2"
                        aria-label="Search"
                        value={filter}
                        onChange={onHandleSearch}
                    />
                    <Button variant="outline-secondary search-button" onClick={onHandleSearchData}>Buscar</Button>
                </Form>
            </div>
        </div>
    );
};

SearchBook.PropTypes = {
    onSearch: PropTypes.func
};

export default SearchBook;