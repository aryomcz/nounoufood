import TableView from '@/Components/Dashboard/Saran/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const SaranIndex = (props) => {
    console.log(props)
    return (
        <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-2xl ml-2">Saran</h1>
              <TableView saran={props.data} />
        </div>
    );

}

SaranIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default SaranIndex;
