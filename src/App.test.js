import { describe, test, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
const { axe, toHaveNoViolations } = require("jest-axe");
import App from "./App.vue";

expect.extend(toHaveNoViolations);

test("App loads", () => {
  const wrapper = mount(App);

  expect(wrapper.text()).toContain("Art by Nathalie Garfinkle");
});

it("App does not have programmatic accessibility violations", async () => {
  const wrapper = mount(App);
  const results = await axe(wrapper.element);

  // does not check color contrast
  expect(results).toHaveNoViolations();
});

describe("Modal", () => {
  test("Modal is hidden by default", () => {
    const wrapper = mount(App, {
      attachTo: document.body,
    });

    expect(wrapper.find(".modal").isVisible()).toBe(false);
  });

  test("Click modal button on art tab displays art details", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-open="modalGiantPanda"]').trigger("click");
    expect(wrapper.find(".modal").isVisible()).toBe(true);
  });

  test("Close modal shows on art tab list view", async () => {
    const wrapper = mount(App);

    await wrapper.find('[data-open="modalGiantPanda"]').trigger("click");
    await wrapper.find(".close-modal").trigger("click");
    expect(wrapper.find(".modal").isVisible()).toBe(false);
  });

  test("Click modal button on sketch tab displays art details", async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
    });

    await wrapper.find('[data-open="modalTakaheSketch"]').trigger("click");
    expect(wrapper.find(".modal").isVisible()).toBe(true);
  });
});

describe("Tab", () => {
  test("Artwork tab is selected by default", () => {
    const wrapper = mount(App, {
      attachTo: document.body,
    });

    expect(wrapper.find("#artTab").isVisible()).toBe(true);
  });

  test("Artwork tab shows 50 art pieces by default", () => {
    const wrapper = mount(App);

    const artworkDiv = wrapper.find("#artTab");
    const images = artworkDiv.findAll('img[src$=".webp"]');
    expect(images).toHaveLength(49);
  });

  test("Artwork tab - deselecting featured filter shows full list", async () => {
    const wrapper = mount(App);

    wrapper.find("summary").trigger("click");
    await wrapper.find(".active-filters").trigger("click");

    const artworkDiv = wrapper.find("#artTab");
    const images = artworkDiv.findAll('img[src$=".webp"], img[src$=".png"]');
    expect(images).toHaveLength(268);
  });

  test("Artwork tab - multiple filters can be selected at once", async () => {
    const wrapper = mount(App);

    wrapper.find("summary").trigger("click");

    const watercolorButton = wrapper
      .findAll("button")
      .filter((button) => button.text() === "Watercolor")
      .at(0);
    await watercolorButton.trigger("click");

    const animalButton = wrapper
      .findAll("button")
      .filter((button) => button.text() === "Animal")
      .at(0);
    await animalButton.trigger("click");

    const artworkDiv = wrapper.find("#artTab");
    const images = artworkDiv.findAll('img[src$=".webp"], img[src$=".png"]');
    expect(images).toHaveLength(28);
  });

  test("Sketches tab is not selected", () => {
    const wrapper = mount(App, {
      attachTo: document.body,
    });

    expect(wrapper.find("#sketchTab").isVisible()).toBe(false);
  });

  test("Select Sketches tab", async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
    });

    expect(wrapper.find("#sketchTab").isVisible()).toBe(false);
    await wrapper.find("#tab-sketch").trigger("click");
    expect(wrapper.find("#sketchTab").isVisible()).toBe(true);
  });

  test("Sketch tab shows all sketches by default", () => {
    const wrapper = mount(App);

    const artworkDiv = wrapper.find("#sketchTab");
    const images = artworkDiv.findAll('img[src$=".webp"], img[src$=".png"]');
    expect(images).toHaveLength(21);
  });

  test("Select Art tab after visiting Sketches tab", async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
    });

    expect(wrapper.find("#sketchTab").isVisible()).toBe(false);
    await wrapper.find("#tab-sketch").trigger("click");
    expect(wrapper.find("#sketchTab").isVisible()).toBe(true);
    await wrapper.find("#tab-art").trigger("click");
    expect(wrapper.find("#sketchTab").isVisible()).toBe(false);
    expect(wrapper.find("#artTab").isVisible()).toBe(true);
  });
});
