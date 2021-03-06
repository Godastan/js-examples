function draw(canvas, tree) {
    var ctx = canvas.getContext('2d');

    var radius = 20;
    var levelHeight = radius * 2 + 30;
    var colWidth = canvas.width;
    var startX = colWidth / 2;
    var startY = radius + 10;
    var root = tree.getRoot();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawChildren(ctx, root, colWidth, startX, startY);

    function drawChildren(ctx, node, colWidth, x, y) {

        var nextLevelY = y + levelHeight;
        var nextColWidth = colWidth / 2;
        var deltaX = nextColWidth / 2;

        if (node.getLeftChild() !== tree.nul) {
            drawLine(ctx, x, y, x - deltaX, nextLevelY);
            drawChildren(
                ctx,
                node.getLeftChild(),
                nextColWidth,
                x - deltaX,
                nextLevelY
            );
        }

        if (node.getRightChild() !== tree.nul) {
            drawLine(ctx, x, y, x + deltaX, nextLevelY);
            drawChildren(
                ctx,
                node.getRightChild(),
                nextColWidth,
                x + deltaX,
                nextLevelY
            );
        }

        drawNode(ctx, node, x, y);
    }

    function drawNode(ctx, node, x, y) {
        ctx.fillStyle = node.getColor() === RBTree.colors.RED
            ? 'rgb(200,0,0)'
            : 'rgb(0,0,0)';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.font='bold 13pt Calibri';
        ctx.fillStyle='white';
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