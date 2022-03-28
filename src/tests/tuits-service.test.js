import {
    createTuit,
    deleteTuit, findAllTuits,
    findTuitById
} from "../services/tuits-service";

import {
    createUser
} from "../services/users-service";

describe('createTuit', () => {
    //create new user
    const bobUser = {
        username: 'bob',
        password: '1234',
        email: 'bob@hotmail.com'
    };
    // sample tuit to insert
    const bobTuit = {
        tuit: 'bob tuit'
    };

    test('can create tuit with REST API', async () => {
        const newUser = await createUser(bobUser);
        // insert new tuit in the database
        const newTuit = await createTuit(newUser._id, bobTuit);

        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(bobTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    });
});

describe('deleteTuit', () => {

    const aliceUser = {
        username: 'alice',
        password: '1234',
        email: 'alice@hotmail.com'
    };

    // sample user to delete
    const aliceTuit = {
        tuit: 'alice tuit sowell'
    };

    test('can delete tuit from REST API', async () => {

        const newUser = await createUser(aliceUser);

        console.log(newUser)

        const newTuit = await createTuit(newUser._id, aliceTuit);

        console.log(newTuit)

        // delete a tuit by their id. Assumes tuit already exists
        const status = await deleteTuit(newTuit._id);

        console.log(status)

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('findTuitById',  () => {
    const adamUser = {
        username: 'adam',
        password: '1234',
        email: 'adam@hotmail.com'
    };
    // sample tuit we want to retrieve
    const adamTuit = {
        tuit: 'adam tuit'
    };

    // setup before running test
    // beforeAll(() => {
    //     // clean up before the test making sure the tuit doesn't already exist
    //     return deleteTuit(adam.tuit)
    // });
    //
    // // clean up after ourselves
    // afterAll(() => {
    //     // remove any data we inserted
    //     return deleteTuit(adam.tuit);
    // });

    test('can retrieve Tuit from REST API by primary key', async () => {
        const newUser = await createUser(adamUser);

        // insert the tuit in the database
        const newTuit = await createTuit(newUser._id, adamTuit);

        // verify new user matches the parameter user
        expect(newTuit.tuit).toEqual(adamTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id)
        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter user
        expect(existingTuit.tuit).toEqual(adamTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(newUser._id)

    });
});


describe('findAllTuits',  () => {

    // sample users we'll insert to then retrieve
    const tuiters = [
        "alice's tuit", "bob's tuit", "charlie's tuit"
    ];

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the tuits
        const tuits = await findAllTuits();

        // there should be a minimum number of users
        expect(tuits.length).toBeGreaterThanOrEqual(tuiters.length);

        // let's check each user we inserted
        const tuitsWeInserted = tuits.filter(
            tuit => tuiters.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuiter = tuiters.find(tuiter => tuiter === tuit.tuiter);
            expect(tuit.tuiter).toEqual(tuiter);
        });
    });
});
