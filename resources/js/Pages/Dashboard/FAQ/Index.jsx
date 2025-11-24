import TableView from '@/Components/Dashboard/FAQ/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const FAQIndex = (props) => {
    return (
        <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-2xl ml-2">FAQ</h1>
              <TableView faq={props.data} />
        </div>
    );

}

FAQIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default FAQIndex;
