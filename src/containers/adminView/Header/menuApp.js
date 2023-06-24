export const adminMenu = [
    //Hệ thống
    {
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.manage-all-codes',
                link: '/system/manage-all-codes'
            },
            {
                name: 'menu.system.manage-category.title',
                subMenus: [
                    {
                        name: 'menu.system.manage-category.main-category',
                        link: '/system/manage-category'
                    },
                    {
                        name: 'menu.system.manage-category.sub-category',
                        link: '/system/manage-sub-category'
                    },
                    {
                        name: 'menu.system.manage-category.child-category',
                        link: '/system/manage-child-category'
                    },
                ]

            },

            // {
            //     name: 'menu.system.manage-tags',
            //     link: '/system/manage-tags'
            // },
        ]
    },
    //Sản phẩm
    {
        name: 'menu.product.header',
        menus: [
            {
                name: 'menu.product.all-product',
                link: '/system/manage-product'
            },
            {
                name: 'menu.product.set-discount',
                link: '/system/product/manage-discount'
            },
            {
                name: 'menu.product.set-product-tag',
                link: '/system/product/manage-product-tag'
            },
        ]

    }
    ,
    //Người dùng
    {
        name: 'menu.user.header',
        menus: [
            {
                name: 'menu.user.all',
                link: '/system/users'
            },
        ]

    }
    ,
    //Đơn hàng
    {
        name: 'menu.orders.header',
        menus: [
            {
                name: 'menu.orders.manage-orders',
                link: '/system/manage-orders'
            },
        ]

    }

];