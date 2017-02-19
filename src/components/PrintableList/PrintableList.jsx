import React from 'react';
import ReactTable from 'react-table'

const columns = [{
    header: 'Date',
    accessor: 'date',
    // maxWidth: 100
}, {
    header: 'Salt (mgs)',
    accessor: 'saltTotal',
    // maxWidth: 65
}, {
    header: 'Water (oz)',
    accessor: 'waterTotal',
    // maxWidth: 75
}, {
    header: 'BP (mmHg)',
    accessor: 'bp',
    // maxWidth: 85
}, {
    header: 'Heartrate (bpm)',
    accessor: 'heartrate',
    // maxWidth: 100
}, {
    header: 'Weight (lbs)',
    accessor: 'weight',
    // maxWidth: 75
}]

const PrintableList = (props) => {
        return (
            <ReactTable className="item-list"
                        data={props.list}
                        columns={columns}
                        defaultPageSize={100} />
        );

}

export default PrintableList;