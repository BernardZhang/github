import G6 from '@antv/g6';

G6.registerNode(
    'enterprise',
    {
        /**
         * 绘制节点，包含文本
         * @param  {Object} cfg 节点的配置项
         * @param  {G.Group} group 图形分组，节点中的图形对象的容器
         * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
         */
        draw(cfg, group) {
            // console.log('draw...', cfg, group);
            const { id, label, style, size } = cfg;
            const keyShape = group.addShape('circle', {
                attrs: {
                    ...style,
                    r: size / 2,
                    // fill: 'red',
                    // shadowOffsetX: 10,
                    // shadowOffsetY: 10,
                    // shadowColor: 'blue',
                    // shadowBlur: 10,
                    // opacity: 0.8,
                },
                // must be assigned in G6 3.3 and later versions. it can be any value you want
                name: 'circle-shape',
            });

            group.addShape('dom', {
                attrs: {
                    x: -size / 2,
                    y: -size / 2,
                    width: size,
                    height: size,
                    html: `<span class="node-text">${label}</span>`
                    // html: `<span class="node-text">${label}(${id})</span>`
                },
            });


            return keyShape;
        },
        /**
         * 绘制后的附加操作，默认没有任何操作
         * @param  {Object} cfg 节点的配置项
         * @param  {G.Group} group 图形分组，节点中的图形对象的容器
         */
        afterDraw(cfg, group) { },
        /**
         * 更新节点，包含文本
         * @override
         * @param  {Object} cfg 节点的配置项
         * @param  {Node} node 节点
         */
        update(cfg, node) { },
        /**
         * 更新节点后的操作，一般同 afterDraw 配合使用
         * @override
         * @param  {Object} cfg 节点的配置项
         * @param  {Node} node 节点
         */
        afterUpdate(cfg, node) { },
        /**
         * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
         * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
         * @param  {String} name 状态名称
         * @param  {Object} value 状态值
         * @param  {Node} node 节点
         */
        setState(name, value, node) { },
        /**
         * 获取锚点（相关边的连入点）
         * @param  {Object} cfg 节点的配置项
         * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
         */
        getAnchorPoints(cfg) { },
    },
    'circle',
);

G6.registerNode(
    'icon-node',
    {
        options: {
            size: [60, 20],
            stroke: '#91d5ff',
            fill: '#91d5ff',
        },
        draw(cfg, group) {
            const styles = this.getShapeStyle(cfg);
            const { labelCfg = {} } = cfg;

            const w = styles.width;
            const h = styles.height;

            const keyShape = group.addShape('rect', {
                attrs: {
                    ...styles,
                    x: -w / 2,
                    y: -h / 2,
                },
            });

            /**
             * leftIcon 格式如下：
             *  {
             *    style: ShapeStyle;
             *    img: ''
             *  }
             */
            console.log('cfg.leftIcon', cfg.leftIcon);
            if (cfg.leftIcon) {
                const { style, img } = cfg.leftIcon;
                group.addShape('rect', {
                    attrs: {
                        x: 1 - w / 2,
                        y: 1 - h / 2,
                        width: 38,
                        height: styles.height - 2,
                        fill: '#8c8c8c',
                        ...style,
                    },
                });

                group.addShape('image', {
                    attrs: {
                        x: 8 - w / 2,
                        y: 8 - h / 2,
                        width: 24,
                        height: 24,
                        img:
                            img ||
                            'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
                    },
                    name: 'image-shape',
                });
            }

            // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
            group.addShape('marker', {
                attrs: {
                    x: 40 - w / 2,
                    y: 52 - h / 2,
                    r: 6,
                    stroke: '#73d13d',
                    cursor: 'pointer',
                    // symbol: EXPAND_ICON,
                },
                name: 'add-item',
            });

            group.addShape('marker', {
                attrs: {
                    x: 80 - w / 2,
                    y: 52 - h / 2,
                    r: 6,
                    stroke: '#ff4d4f',
                    cursor: 'pointer',
                    // symbol: COLLAPSE_ICON,
                },
                name: 'remove-item',
            });

            if (cfg.label) {
                group.addShape('text', {
                    attrs: {
                        ...labelCfg.style,
                        text: cfg.label,
                        x: 50 - w / 2,
                        y: 25 - h / 2,
                    },
                });
            }

            return keyShape;
        },
        update: undefined
    },
    'rect',
);