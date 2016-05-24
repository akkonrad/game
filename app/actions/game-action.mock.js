function getActionsMockArray() {
    return [
        {
            title: 'Action 1',
            color: 'orange',
            description: 'lorem ipsum dolor sit amet.',
            duration: 5,
            active: 1,
            requirements: {
                respect: 0,
                money: 5
            },
            cost: {
                money: 5
            },
            reward: {
                money: 100,
                respect: 1
            },
            visible: {
                on: 1,
                visible_at: 0
            }
        },
        {
            title: 'Action 2',
            color: 'blue',
            description: 'another description ipsum lorem.',
            duration: 5,
            active: 1,
            requirements: {
                respect: 1,
                money: 20
            },
            cost: {
                money: 20
            },
            reward: {
                money: 100,
                respect: 10
            },
            visible: {
                on: 0,
                visible_at: 5
            }
        }
    ];
}
