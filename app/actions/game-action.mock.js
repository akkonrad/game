function getActionsMockArray() {
    return [
        {
            title: 'Action 1',
            color: 'orange',
            description: 'lorem ipsum dolor sit amet.',
            requirements: {
                respect: 10,
                money: 10
            },
            cost: {
                money: 5
            },
            reward: {
                money: 100,
                respect: 10
            },
            visible: {
                on: 1,
                visible_at: 5
            }
        },
        {
            title: 'Action 2',
            color: 'blue',
            description: 'lorem ipsum dolor sit amet.',
            duration: 5,
            requirements: {
                respect: 20,
                money: 20
            },
            cost: {
                money: 5
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
