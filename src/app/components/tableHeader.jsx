import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item && selectedSort.order === "asc") {
            onSort({ path: item, order: "desc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const renderArrow = (currentPath) => {
        if (!currentPath) return;
        if (currentPath === selectedSort.path) {
            return selectedSort.order === "asc" ? (
                <i className="bi bi-caret-up-fill"></i>
            ) : (
                <i className="bi bi-caret-down-fill"></i>
            );
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        role={columns[column].path && "button"}
                        scope="col"
                    >
                        {columns[column].name}
                        {renderArrow(columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
