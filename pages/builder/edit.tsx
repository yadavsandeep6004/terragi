import { NextPage } from "next";

import { AddPropertyForm } from "../../components/add-property-form";
import { withAuth } from "../../hoc/withAuth";
import { Layout } from "../../components/layout";

const Edit: NextPage = () => (
    <Layout>
        <div className="max-w-[1024px] w-full mx-auto py-14">
            <AddPropertyForm isEdit />
        </div>
    </Layout>
);

export default withAuth(Edit);
