import React, { useState } from 'react';
import useSortableData from '../../lib/withSortedItems';
import {StyledMetadata} from "./StyledMetadata";


const convertMetadataString = (data) => {
    let metadata = data && JSON.parse(data.metadata)

    let nameValueMetadata = [];
    for (var key in metadata) {
        if (metadata.hasOwnProperty(key)) {
            nameValueMetadata.push(...nameValueMetadata, {
                name: [key],
                value: metadata[key]
            })
        }
    }

    return nameValueMetadata;
}

const Metadata = ({ metadata }) => {    
    const metadataArray = convertMetadataString(metadata)
    const { sortedItems, getClassNamesFor, requestSort } = useSortableData(metadataArray, {key: 'name', direction: 'ascending'});

    const [factTerm, setFactTerm] = useState('');
    const [hasFilter, setHasFilter] = React.useState(false);

    const handleFactFilterChange = (event) => {
        setHasFilter(false);

        if (event.target.value !== null || event.target.value !== '') {
            setHasFilter(true);
        }
        setFactTerm(event.target.value);
    };

    const handleSort = (key) => {
        return requestSort(key);
    };

    const filterResults = (item) => {
        const lowercasedFilter = factTerm.toLowerCase();

        if (factTerm == null || factTerm === '') {
            return metadataArray;
        }

        return Object.keys(item).some(key => {
            if (item[key] !== null) {
                return item[key].toString().toLowerCase().includes(lowercasedFilter);
            }
        });
    };

    return (
        <StyledMetadata>
            <div className="filters">
                <input type="text" id="filter" placeholder="Filter metadata"
                       value={factTerm}
                       onChange={handleFactFilterChange}
                />
            </div>
            <div className="header">
                <button
                    type="button"
                    onClick={() => handleSort('name')}
                    className={`button-sort name ${getClassNamesFor('name')}`}
                >
                    Name
                </button>
                <button
                    type="button"
                    onClick={() => handleSort('value')}
                    className={`button-sort value ${getClassNamesFor('value')}`}
                >
                    Value
                </button>
            </div>
            <div className="data-table">
                {!sortedItems.filter(metadata => filterResults(metadata)).length && <div className="data-none">No metadata</div>}
                {sortedItems.filter(metadata => filterResults(metadata)).map((metadata, index) => {
                    return (
                        <div className="data-row row-heading" key={index}>
                            <div className="col col-1">{metadata.name}</div>
                            <div className="col col-2">{metadata.value}</div>
                        </div>
                    );
                })}
            </div>
        </StyledMetadata>
    );
};

export default Metadata;
