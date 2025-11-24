import TableView from '@/Components/Dashboard/Testimoni/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const TestimoniIndex = (props) => {
    return (
        <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-2xl ml-2">Testimoni</h1>
              <TableView testi={props.data} />
        </div>
    );

}

TestimoniIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default TestimoniIndex;
