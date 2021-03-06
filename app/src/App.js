import * as React from "react";
import { render } from "react-dom";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { PostList, PostEdit, PostCreate, PostIcon } from "./posts";

render(
    <Admin dataProvider={simpleRestProvider("http://localhost/society")}>
        <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
        />
    </Admin>,
    document.getElementById("root")
);
