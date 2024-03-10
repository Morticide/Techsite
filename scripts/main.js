class QuickDoors {
  static findClosestWall(p, l) {
    const x = p.x;
    const y = p.y;
    const walls = QuickDoors.filterByHibox(p);
    let closestWall = walls[0];
    let prevDist = 100000000000000;
    for(let wall of walls) {
      const nearestPoint = QuickDoors.findSnapPoint(p, wall);
      const dist = QuickDoors.getDistance(p, nearestPoint);
      if(dist < prevDist) {
        prevDist = dist;
        closestWall = wall;
      }
    }
    return closestWall;

    return walls.reduce((acc, v) => {
      const prevWallCenter = acc.center;
      const wallCenter = v.center;
      const prevDist = QuickDoors.getDistance(prevWallCenter, p);
      const dist = QuickDoors.getDistance(wallCenter, p);
      if (dist < prevDist) {
        return v;
      }
      return acc;
    }, walls[0]);
  }

  static filterByHibox(p){
    return canvas.walls.placeables.filter(w => w.visible).filter(w => QuickDoors.createHitbox(w).contains(p.x,p.y))
  }

  static createHitbox(w){
    //given a segment, create a hitbox with padding
    const c = w.document.c
    const r = QuickDoors.getDistance({x: c[0], y: c[1]}, {x: c[2], y: c[3]});
    return new PIXI.Circle(w.center.x, w.center.y, r/2);
  }

  static getDistance(p1, p2) {
    const x = p1.x - p2.x;
    const y = p1.y - p2.y;
    return Math.sqrt(x * x + y * y);
  }

  static getAngle(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    return Math.atan2(yDiff, xDiff);
  }

  static solveQuadratic(a, b, c) {
    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
      return [];
    }
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [x1, x2];
  }

  static findSnapPoint(p, wall) {
    const x1 = wall.document.c[0];
    const y1 = wall.document.c[1];
    const x2 = wall.document.c[2];
    const y2 = wall.document.c[3];
    if((x2 - x1) == 0) return {x:x1, y:p.y};
    if((y2 - y1) == 0) return {x:p.x, y:y1};
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    const m2 = -1 / m;
    const b2 = p.y - m2 * p.x;

    const x3 =  (b - b2) / (m2 - m);
    const y3 = m2 * x3 + b2;

    return { x: x3, y: y3 };
  }

  static getDoorCoords(p, l) {
    const closestWall = QuickDoors.findClosestWall(p,l);
    if(!closestWall) return ui.notifications.warn("No wall found, You must click close to a wall!");
    const snapPoint = QuickDoors.findSnapPoint(p, closestWall);
    const r = l / 2;
    //define points of the wall segment
    let x1 = closestWall.document.c[0];
    let y1 = closestWall.document.c[1];
    let x2 = closestWall.document.c[2];
    let y2 = closestWall.document.c[3];
    const cx = snapPoint.x;
    const cy = snapPoint.y;
    //get the line equation of the wall segment
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    const angle = QuickDoors.getAngle(x1, y1, x2, y2);
    let _x1 = cx + r * Math.cos(angle + Math.PI);
    let _y1 = cy + r * Math.sin(angle + Math.PI);
    let _x2 = cx + r * Math.cos(angle);
    let _y2 = cy + r * Math.sin(angle);
    const dp1 = { x: _x1, y: _y1 };
    const dp2 = { x: _x2, y: _y2 };
    const wp1 = { x: x1, y: y1 };
    const wp2 = { x: x2, y: y2 };
    const distd1w1 = QuickDoors.getDistance(dp1, wp1);
    const distd1w2 = QuickDoors.getDistance(dp1, wp2);
    const distd2w1 = QuickDoors.getDistance(dp2, wp1);
    const distd2w2 = QuickDoors.getDistance(dp2, wp2);
    if(distd1w1 <= l && distd2w1 <= l) {
      if(distd1w1 < distd2w1) {
        _x1 = x1;
        _y1 = y1;
      }else{
        _x2 = x1;
        _y2 = y1;
      }
    }
    if(distd1w2 <= l && distd2w2 <= l) {
      if(distd1w2 < distd2w2) {
        _x1 = x2;
        _y1 = y2;
      }else{
        _x2 = x2;
        _y2 = y2;
      }
    }
    return [_x1, _y1, _x2, _y2];
  }

  static async createDoor(p, l, snap = false, secret = false, window = false) {
    let door = secret ? 2 : 1;
    let c = QuickDoors.getDoorCoords(p, l);
    let s = window ? 0 : 1;
    door = window ? 0 : door;
    const w = QuickDoors.findClosestWall(p,l);
    if(!snap) c = QuickDoors.snapToGrid(c);
    const lenght = QuickDoors.getDistance({x:w.document.c[0], y:w.document.c[1]}, {x:w.document.c[2], y:w.document.c[3]});
    if(lenght <= l*Math.SQRT2) {
      w.document.update({
        sense: s,
        door: door,
      })
      return;
    }
    const newWalls = QuickDoors.getNewWalls(w, c);
    const wall1Data = w.document.toObject();
    wall1Data.c = newWalls.w1;
    const wall2Data = w.document.toObject();
    wall2Data.c = newWalls.w2;
    let docsData = [{
      c: c,
      sense: s,
      door: door,
      flags: wall1Data.flags
    }]
    const wd1l = QuickDoors.getDistance({x:wall1Data.c[0], y:wall1Data.c[1]}, {x:wall1Data.c[2], y:wall1Data.c[3]});
    const wd2l = QuickDoors.getDistance({x:wall2Data.c[0], y:wall2Data.c[1]}, {x:wall2Data.c[2], y:wall2Data.c[3]});
    if(wd1l > 1) docsData.push(wall1Data);
    if(wd2l > 1) docsData.push(wall2Data);
    await canvas.scene.createEmbeddedDocuments("Wall", docsData);
    await w.document.delete();

  }

  static getNewWalls(w, c) {
    const cx1 = c[0];
    const cy1 = c[1];
    const cx2 = c[2];
    const cy2 = c[3];
    const x1 = w.document.c[0];
    const y1 = w.document.c[1];
    const x2 = w.document.c[2];
    const y2 = w.document.c[3];
    const d1 = QuickDoors.getDistance({ x: cx1, y: cy1 }, { x: x1, y: y1 });
    const d2 = QuickDoors.getDistance({ x: cx2, y: cy2 }, { x: x1, y: y1 });
    const newWalls = {};
    if (d1 < d2) {
      newWalls.w1 = [x1, y1, cx1, cy1];
      newWalls.w2 = [x2, y2, cx2, cy2];
    } else {
      newWalls.w1 = [x1, y1, cx2, cy2];
      newWalls.w2 = [x2, y2, cx1, cy1];
    }
    return newWalls;
  }

  static snapToGrid(c) {
    const c1 = canvas.grid.getSnappedPosition(c[0], c[1]);
    const c2 = canvas.grid.getSnappedPosition(c[2], c[3]);
    return [c1.x, c1.y, c2.x, c2.y];
  }

  static async removeDoor(w){
    if(!w) return ui.notifications.warn("No wall found, You must click close to a wall!");
    const c1 = {x: w.document.c[0], y: w.document.c[1]};
    const c2 = {x: w.document.c[2], y: w.document.c[3]};
    let c1Walls = [];
    let c2Walls = [];
    for(let wall of canvas.walls.placeables.filter(w => w.visible)){
      if(wall.id === w.id) continue;
      const c = wall.document.c;
      if((c[0] == c1.x && c[1] == c1.y) || (c[2] == c1.x && c[3] == c1.y)) c1Walls.push(wall);
      if((c[0] == c2.x && c[1] == c2.y) || (c[2] == c2.x && c[3] == c2.y)) c2Walls.push(wall);
    }
    if(c1Walls.length == 0 && c2Walls.length == 0) {
      w.document.delete();
    return;
    }
    if(c1Walls.length != 1 || c2Walls.length != 1){
      const doorDirection = QuickDoors.getAngle(c1.x, c1.y, c2.x, c2.y);
      c1Walls = c1Walls.filter(
        wall => Math.abs(QuickDoors.getAngle(wall.document.c[0], wall.document.c[1], wall.document.c[2],wall.document.c[3]) - doorDirection) < 0.1 || Math.abs(QuickDoors.getAngle(wall.document.c[2], wall.document.c[3], wall.document.c[0],wall.document.c[1]) - doorDirection) < 0.1
      )
      c2Walls = c2Walls.filter(
        wall => Math.abs(QuickDoors.getAngle(wall.document.c[0], wall.document.c[1], wall.document.c[2],wall.document.c[3]) - doorDirection) < 0.1 || Math.abs(QuickDoors.getAngle(wall.document.c[2], wall.document.c[3], wall.document.c[0],wall.document.c[1]) - doorDirection) < 0.1
      )
    }
      let allC = [
        {x: c1Walls[0].document.c[0], y: c1Walls[0].document.c[1]},
        {x: c1Walls[0].document.c[2], y: c1Walls[0].document.c[3]},
        {x: c2Walls[0].document.c[0], y: c2Walls[0].document.c[1]},
        {x: c2Walls[0].document.c[2], y: c2Walls[0].document.c[3]},
      ];
      allC = allC.filter(c => (c.x != c1.x || c.y != c1.y) && (c.x != c2.x || c.y != c2.y));
      const wallData = c1Walls[0].document.toObject();
      wallData.c = [allC[0].x, allC[0].y, allC[1].x, allC[1].y];
      const wallsToDelete = [c1Walls[0].id, c2Walls[0].id, w.id];
      await canvas.scene.deleteEmbeddedDocuments("Wall", wallsToDelete);
      await canvas.scene.createEmbeddedDocuments("Wall", [wallData]);
  }

  static _onClickLeft(wrapped, ...args) {
    wrapped(...args);
    if(ui.controls.quickDoors && canvas.walls.active){
        const e = args[0].data.originalEvent;
        const [x, y] = [e.clientX, e.clientY];
        const t = canvas.stage.worldTransform;
        const cX = (x - t.tx) / canvas.stage.scale.x;
        const cy = (y - t.ty) / canvas.stage.scale.y;
        const size = ui?.controls?.qdSize ?? canvas.scene.dimensions.size;
        const multi = keyboard.downKeys.has("Keyd") || keyboard.downKeys.has("KeyD") ? 2 : 1;
        QuickDoors.createDoor({ x: cX, y: cy }, parseInt(size*multi), !e.shiftKey,e.altKey, e.ctrlKey);
    }

  }

  static _onClickRight(wrapped, ...args) {
    wrapped(...args);
    if(ui.controls.quickDoors && canvas.walls.active){
      const e = args[0].data.originalEvent;
      if(!e.ctrlKey) return;
      const [x, y] = [e.clientX, e.clientY];
      const t = canvas.stage.worldTransform;
      const cX = (x - t.tx) / canvas.stage.scale.x;
      const cy = (y - t.ty) / canvas.stage.scale.y;
      const size = ui?.controls?.qdSize ?? canvas.scene.dimensions.size;
      const closestWall = QuickDoors.findClosestWall({x:cX, y:cy}, size*Math.SQRT2);
      QuickDoors.removeDoor(closestWall);
    }
  }
}
