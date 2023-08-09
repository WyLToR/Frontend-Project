import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import CRUD from '../services/CRUD';
import { DATABASE_URL } from './firebaseConfig';

export default function SelectedOption({ inputValue, setInputValue }) {
    const [categories, setCategories] = useState({})
    useEffect(() => {
        fetch(`${DATABASE_URL}categories.json`)
            .then(resp => resp.json())
            .then(info => setCategories(info))
    }, [categories])
    return (
        <Form.Select value={inputValue} onChange={(e) => setInputValue(e.target.value)} defaultValue="Choose">
            <option defaultChecked>Válassz egy kategóriát</option>
            {Object.entries(categories).map(([optgroupLabel, options]) => (
                <optgroup key={optgroupLabel} label={optgroupLabel}>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </optgroup>
            ))}
        </Form.Select>
    )
}