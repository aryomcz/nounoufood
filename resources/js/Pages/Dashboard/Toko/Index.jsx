import TableView from '@/Components/Dashboard/Toko/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const TokoIndex = (props) => {
    console.log(props)
    return (
        <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-2xl ml-2">Toko</h1>
              <TableView toko={props.data} />
        </div>
    );

}

TokoIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default TokoIndex;
