import React from "react";
import { mount } from "enzyme";

import CommentList from "components/CommentList";
import Root from "Root";

let component;
beforeEach(() => {
  const initialState = {
    comments: ["Comment 1", "Comment 2"]
  };

  component = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("create one <li> per comment", () => {
  // console.log(component.find("li").length);
  expect(component.find("li").length).toEqual(2);
});

it("shows the text for each comment", () => {
  // console.log(component.render().text());
  expect(component.render().text()).toContain("Comment 1");
  expect(component.render().text()).toContain("Comment 2");
});
