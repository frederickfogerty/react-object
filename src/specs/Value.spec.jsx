"use strict"
import React from "react";
import Value from "../components/Value";
import { lorem } from "./util";
import {
  italicSection,
  sizeSection,
  objectValueSection,
  arrayValueSection,
  functionValueSection,
  collapsedTotalSection
} from "./sections";


describe("Value", function() {
  this.header("## A single value of any type.");
  before(() => {
    const value = { foo: 123, bar: { baz: "hello" }};
    this
      .align("top left")
      .scroll(true)
      .load( <Value
                label="foo"
                value={ value }/>
      );
  });


  section("label", () => {
    it("`null`", () => this.props({ label: null }));
    it("`'foo'`", () => this.props({ label: "foo" }));
  });


  section("showTwisty", () => {
    it("`true`", () => this.props({ showTwisty:true }));
    it("`false`", () => this.props({ showTwisty:false }));
    it("`undefined` (auto)", () => this.props({ showTwisty:undefined }));
  });


  section("Primitive", () => {
    it("`string` short", () => this.props({ value: "My String" }));
    it("`string` long", () => this.props({ value: lorem() }));
    it("`number: 123456`", () => this.props({ value: 123456 }));
    it("`number: -1`", () => this.props({ value: -1 }));
    it("`bool: true`", () => this.props({ value: true }));
    it("`bool: false`", () => this.props({ value: false }));
    it("`null`", () => this.props({ value: null }));
    it("`undefined`", () => this.props({ value: undefined }));
  });

  objectValueSection.call(this);
  arrayValueSection.call(this);

  section("Date", () => {
    it("`date: now`", () => this.props({ value: new Date() }));
  });

  functionValueSection.call(this);
  italicSection.call(this);
  sizeSection.call(this);
  collapsedTotalSection.call(this);
});
