import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactList } from ".";
import { ContactsProvider } from "../../Providers/Contactsprovider";

describe("ContactList component", () => {
  test("Renders an ContactList component", async () => {
    render(
      <ContactsProvider>
        <ContactList />
      </ContactsProvider>
    );

    // Check that loading indication is rendered
    const loading = await screen.findByText(/loading/);
    expect(loading).toBeInTheDocument();

    //Check that contacts list is rendered
    const contactListContainer = await screen.findByText(
      /Contacts/,
      undefined,
      { timeout: 2000 }
    );
    expect(contactListContainer).toBeInTheDocument();

    //Check that Add button is rendered
    const addButton = screen.getByRole("button", { name: /Add contact/i });
    expect(addButton).toBeInTheDocument();

    const contactButtons = await screen.findAllByRole("button", undefined, {
      timeout: 2000,
    });
    //Checking that there are buttons to interact with contacts asuming there will always be more than 2
    expect(contactButtons.length).toBeGreaterThan(2);
  });

  test("Open contact details when clicking on contacts", async () => {
    render(
      <ContactsProvider>
        <ContactList />
      </ContactsProvider>
    );

    //Skip the first button and select the first contact button
    const allButtons = await screen.findAllByRole("button", undefined, {
      timeout: 2000,
    });
    const contactButton = allButtons[1];
    expect(contactButton).toBeInTheDocument();

    //Click on contact button
    userEvent.click(contactButton);

    //Check that contact details are rendered
    const contactDetails = await screen.findByRole("dialog");
    expect(contactDetails).toBeInTheDocument();

    //Check that edit button is rendered within the contact details dialog
    const editButton = await screen.findByRole("button", { name: "Edit" });
    expect(editButton).toBeInTheDocument();
  });
});
