function getItemsMockArray() {

    return [
        {
            name: "Name 1", // item name, displayed on
            level: 1,
            color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
            picked_color: 'red',
            description: "lorem ipsum dolor sit amet",
            upgrade_cost: 4,
            current_income: 1,
            can_afford: 0,
            base_income: 1,
            requires: [],
            active: 1,
            timeout: 2,
            visible: {
                on: 1,
                visible_at: 0,
                enabled_at: 0
            },
            bonuses: [
                {
                    name: "some name for bonus, describe what it does, eg: 10 percent more for 10 seconds",
                    cooldown_seconds: 360,
                    duration: 10,
                    bonus_income: 0,
                    percentage: 10
                },
                {
                    name: "another bonus, get 100 gold",
                    cooldown_seconds: 360,
                    duration: 5,
                    bonus_income: 100,
                    percentage: 0
                }
            ]
        },
        {
            name: "Name 2",
            level: 0,
            color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
            picked_color: 'olive',
            description: "lorem ipsum dolor sit amet",
            upgrade_cost: 18,
            can_afford: 0,
            active: 1,
            timeout: 6,
            current_income: 3,
            base_income: 3,
            requires: [
                "Item 1"
            ],
            visible: {
                on: 0,
                visible_at: 10,
                enabled_at: 10
            },
            bonuses: [
                {
                    name: "some name for bonus, describe what it does, eg: 10 percent more for 10 seconds",
                    cooldown_seconds: 360,
                    duration: 10,
                    bonus_income: 0,
                    percentage: 10
                },
                {
                    name: "another bonus, get 100 gold",
                    cooldown_seconds: 360,
                    duration: 5,
                    bonus_income: 100,
                    percentage: 0
                }
            ]
        },
        {
            name: "Name 3",
            level: 0,
            color: ['red', 'yellow', 'aqua', 'blue', 'light-blue', 'green', 'navy', 'teal', 'olive', 'lime', 'orange', 'fuchsia', 'purple', 'maroon', 'black'],
            picked_color: 'purple',
            description: "lorem ipsum dolor sit amet",
            upgrade_cost: 80,
            can_afford: 0,
            active: 1,
            timeout: 12,
            current_income: 15,
            base_income: 15,
            requires: [
                "Item 1",
                "Item 2"
            ],
            visible: {
                on: 0,
                visible_at: 30,
                enabled_at: 100
            },
            bonuses: [
                {
                    name: "some name for bonus, describe what it does, eg: 10 percent more for 10 seconds",
                    cooldown_seconds: 360,
                    duration: 10,
                    bonus_income: 0,
                    percentage: 10
                },
                {
                    name: "another bonus, get 100 gold",
                    cooldown_seconds: 360,
                    duration: 5,
                    bonus_income: 100,
                    percentage: 0
                }
            ]
        }
    ];
}