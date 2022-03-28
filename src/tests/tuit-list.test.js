import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import * as services from "./services";
import {HashRouter} from "react-router-dom";
import * as service from "../services/tuits-service";
import axios from "axios";

// jest.mock('axios');

// const MOCKED_USERS = [
//     "alice", "bob", "charlie"
// ];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: {username: "Alice", email: "alice@wonderland.com"}, _id: "123"},
    {tuit: "bob's tuit", postedBy: {username: "Bob", email: "bob@builders.inc"}, _id: "124"},
    {tuit: "charlie's tuit", postedBy: {username: "Carlie", email: "charile@chocolate.com"}, _id: "125"},
];

describe('render from static', () => {
    test('tuit list renders static tuit array', () => {
        const deleteTuit=(tid) =>
            service.deleteTuit(tid)
                .then();
        render(
            <HashRouter>
                <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteTuit}/>
            </HashRouter>);

        const expectations = [/alice's tuit/i, /bob's tuit/i,
            /charlie's tuit/i, /Alice/i, /Bob/i, /Charlie/i];

        expectations.forEach((expectation) => {
             let linkElements = screen.getAllByText(expectation);

                linkElements.forEach((element) => {
                    expect(element).toBeInTheDocument();
            });
        });
    });
});

test('tuit list renders async', async () => {
    const tuits = await services.findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits} />
        </HashRouter>);
    const linkElement = screen.getByText(/This is bob's updated tuit/i);
    expect(linkElement).toBeInTheDocument();
})


describe('render from mock', () => {

    const MOCKED_TUITS = [
        {tuit: "alice's tuit", postedBy: {username: "Alice", email: "alice@wonderland.com"}, _id: "123"},
        {tuit: "bob's tuit", postedBy: {username: "Bob", email: "bob@builders.inc"}, _id: "124"},
        {tuit: "charlie's tuit", postedBy: {username: "Carlie", email: "charile@chocolate.com"}, _id: "125"},
    ];

    test('tuit list renders mocked', async () => {
        const mock = jest.spyOn(axios, 'get');
        mock.mockImplementation(() =>
            Promise.resolve({data: {tuits: MOCKED_TUITS}}));
        const response = await service.findAllTuits();
        const tuits = response.tuits;
        mock.mockRestore();

        render(
            <HashRouter>
                <Tuits tuits={tuits}/>
            </HashRouter>);

        const expectations = [/alice's tuit/i, /bob's tuit/i,
            /charlie's tuit/i, /Alice/i, /Bob/i, /Charlie/i];

        expectations.forEach((expectation) => {
            let linkElements = screen.getAllByText(expectation);

            linkElements.forEach((element) => {
                expect(element).toBeInTheDocument();
            });
        });
    });
});
