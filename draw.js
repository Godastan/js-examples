function draw(tree) {
    var radius = 20;
    var levelHeight = radius * 2 + 30;
    var colWidth = 1440;
    var startX = colWidth / 2;
    var startY = radius + 10;
    var root = tree.getRoot();
    var color = 'rgb(200,0,0)';

    var canvas = document.getElementById("test_canvas");
    var ctx = canvas.getContext('2d');

    drawChildren(ctx, root, colWidth, startX, startY, color);

    function drawChildren(ctx, node, colWidth, x, y, color) {
        drawNode(ctx, node, x, y, color);

        if (node.getLeftChild() !== null) {
            drawChildren(
                ctx,
                node.getLeftChild(),
                colWidth / 2,
                x - colWidth / 4,
                y + levelHeight,
                color
            );
        }

        if (node.getRightChild()) {
            drawChildren(
                ctx,
                node.getRightChild(),
                colWidth / 2,
                x + colWidth / 4,
                y + levelHeight,
                color
            );
        }
    }

    function drawNode(ctx, node, x, y, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}