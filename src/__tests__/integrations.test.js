import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install();
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "Fetch #1" }, { name: "Fetch #2" }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can fetch a list of comments and display them", done => {
  // attemp to render the *entire* app
  const component = mount(
    <Root>
      <App />
    </Root>
  );

  // find the 'fetchComments' button and click it
  component.find(".fetchComments").simulate("click");

  // // introduce a TINY little pause
  // setTimeout(() => {
  //   component.update();
  //   // expect to find a list of comments
  //   expect(component.find("li").length).toEqual(2);
  //   done();

  //   component.unmount();
  // }, 100);

  moxios.wait(() => {
    component.update();
    // expect to find a list of comments
    expect(component.find("li").length).toEqual(2);
    done();

    component.unmount();
  });
});
