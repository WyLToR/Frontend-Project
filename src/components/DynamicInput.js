import { useState } from 'react';
import SelectOptions from '../constants/categories';
import './DynamicInput.css';

export default function DynamicInput({ categories, setCategories }) {
    const [inputValue, setInputValue] = useState('');
    const [showForm, setShowForm] = useState(false);
    function handleAddCategory(event) {
        event.preventDefault();
        setCategories(prev => prev ? [...prev, inputValue] : [inputValue]);
        setInputValue("");
        setShowForm(false);
    }

    function handleDeleteCategory(idx) {
        setCategories([...categories.slice(0, idx), ...categories.slice(idx + 1)]);
    }

    return (
        <div className="dynamic-input-container">
            <div className="dynamic-input-value-container">
                {categories?.map((category, idx) => (
                    <span key={idx} className="dynamic-input-value">{category}
                        <button type="button" className="dynamic-input-delete" onClick={() => handleDeleteCategory(idx)}>x</button>
                    </span>
                ))}
                {!showForm && <button className="dynamic-input-toggle" type="button" onClick={() => setShowForm(true)}>+</button>}
            </div>
            {showForm && (
                <div className="dynamic-input-form">
                    <SelectOptions inputValue={inputValue} setInputValue={setInputValue} />
                    <button onClick={handleAddCategory} className="dynamic-input-add" type="submit" disabled={inputValue == ''}>Hozzáad</button>
                    <button onClick={() => setShowForm(false)} className="dynamic-input-cancel" type="submit">Mégse</button>
                </div>
            )}
        </div>
    );
}
