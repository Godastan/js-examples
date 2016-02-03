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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawChildren(ctx, root, colWidth, startX, startY, color);

    function drawChildren(ctx, node, colWidth, x, y, color) {

        var nextLevelY = y + levelHeight;

        if (node.getLeftChild() !== null) {
            drawLine(ctx, x, y, x - colWidth / 4, nextLevelY);
            drawChildren(
                ctx,
                node.getLeftChild(),
                colWidth / 2,
                x - colWidth / 4,
                nextLevelY,
                color
            );
        }

        if (node.getRightChild()) {
            drawLine(ctx, x, y, x + colWidth / 4, nextLevelY);
            drawChildren(
                ctx,
                node.getRightChild(),
                colWidth / 2,
                x + colWidth / 4,
                nextLevelY,
                color
            );
        }

        drawNode(ctx, node, x, y, color);
    }

    function drawNode(ctx, node, x, y, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.font='13pt Calibri';
        ctx.fillStyle='black';
        ctx.fillText(node.getKey(), x - radius / 2, y);
    }

    function drawLine(ctx, x1, y1, x2, y2){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
}