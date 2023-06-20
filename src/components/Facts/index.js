import React, {useState} from 'react';

import useSortableData from '../../lib/withSortedItems';
import {Header, StyledFacts} from './StyledFacts';
import "bootstrap/dist/css/bootstrap.min.css";
import Collapse from "react-bootstrap/Collapse";
import button from '../Button'
import Image from "next/image";
import up from "../../static/images/chevron-up.svg";
import down from "../../static/images/chevron-down.svg";

const Facts = ({facts}) => {
    const {sortedItems, getClassNamesFor, requestSort} = useSortableData(facts, {
        key: 'name',
        direction: 'ascending',
    });

    const groupFacts = facts
        .map((fact) => fact.source)
        .filter((value, index, self) => self.indexOf(value) === index);

    let initFactState = new Array(groupFacts.length).fill(false);

    const [factTerm, setFactTerm] = useState('');
    const [hasFilter, setHasFilter] = React.useState(false);
    const [valueState, setValueState] = useState(initFactState);

    const handleFactFilterChange = event => {
        setHasFilter(false);

        if (event.target.value !== null || event.target.value !== '') {
            setHasFilter(true);
        }
        setFactTerm(event.target.value);
    };

    const handleSort = key => {
        return requestSort(key);
    };

    const filterResults = item => {
        const lowercasedFilter = factTerm.toLowerCase();

        if (factTerm == null || factTerm === '') {
            return facts;
        }

        return Object.keys(item).some(key => {
            if (item[key] !== null) {
                return item[key].toString().toLowerCase().includes(lowercasedFilter);
            }
        });
    };

    const valuesShow = (index) => {
        setValueState((valueState) =>
            valueState.map((el, i) => (i === index ? true : el))
        );
    };

    const valuesHide = (index) => {
        setValueState((valueState) =>
            valueState.map((el, i) => (i === index ? false : el))
        );
    };

    function groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }

        });
        return map
    }

    const groupedFactsByName = groupBy(sortedItems, fact => fact.source.match(/[^:]+$/)[0])
    const groupedFacts = Array.from(groupedFactsByName, function (item) {
        return {key: item[0], value: item[1]}
    });

    return (
        <StyledFacts>
            <div className="filters">
                <input
                    type="text"
                    id="filter"
                    placeholder="Filter facts e.g. PHP version"
                    value={factTerm}
                    onChange={handleFactFilterChange}
                />
            </div>
            <Header>
                <button
                    type="button"
                    onClick={() => handleSort('name')}
                    className={`button-sort name ${getClassNamesFor('name')}`}
                >
                    Name
                </button>
                <button
                    type="button"
                    onClick={() => handleSort('source')}
                    className={`button-sort value ${getClassNamesFor('source')}`}
                >
                    Sources
                </button>
                <button
                    type="button"
                    onClick={() => handleSort('value')}
                    className={`button-sort value ${getClassNamesFor('value')}`}
                >
                    Value
                </button>
            </Header>
            <div className="data-table">
                {!sortedItems.filter(fact => filterResults(fact)).length && <div className="data-none">No Facts</div>}
                {groupedFacts.filter(fact => filterResults(fact)).map((factHeader, index) => {
                    return (
                        <div key={index}>
                            <div className="data-row row-heading">
                                <div className="col col-1">
                                    <div className="name">{factHeader.key.toUpperCase()}</div>
                                </div>
                                <div className="col col-2">{factHeader.value.length}</div>
                                <div className="col col-3">
                              <span onClick={() => !valueState[index] ? valuesShow(index) : valuesHide(index)}>
                            <button
                                className="fact-dropdown"
                                aria-controls="example-collapse-text"
                                aria-expanded={valueState[index]}
                            >
                              <Image
                                  src={valueState[index] ? up : down}
                                  className="showHide"
                                  style={{all: "unset"}}
                                  alt=""
                              />
                            </button>
                              </span>
                                </div>
                            </div>
                            {factHeader.value.map(fact => {
                                return (
                                    <Collapse in={valueState[index]} key={fact.id}>
                                        <div className="data-row row-heading fact-values">
                                            <div className="col col-1">
                                                <div className="name">{fact.name}</div>
                                                <div className="description">{fact.description}</div>
                                            </div>
                                            <div className="col col-2">{fact.source}</div>
                                            <div className="col col-3">{fact.value}</div>
                                        </div>
                                    </Collapse>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </StyledFacts>
    );
};

export default Facts;
