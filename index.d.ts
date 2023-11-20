import { BufferGeometry, Vector3 } from "three";

/**
 * Defines an instance of the pathfinding module, with one or more zones.
 */
declare class Pathfinding {

  /**
   * (Static) Builds a zone/node set from navigation mesh geometry.
   * @param  {BufferGeometry} geometry
   * @param  {number} tolerance Vertex welding tolerance.
   * @return {Zone}
   */
  static createZone(geometry: BufferGeometry, tolerance: number): Zone;
  /**
   * Sets data for the given zone.
   * @param {string} zoneID
   * @param {Zone} zone
   */
  setZoneData(zoneID: string, zone: BufferGeometry): void;

  /**
   * Returns a random node within a given range of a given position.
   * @param  {string} zoneID
   * @param  {number} groupID
   * @param  {Vector3} nearPosition
   * @param  {number} nearRange
   * @return {Node}
   */
  getRandomNode(zoneID: string, groupID: number, nearPosition: Vector3, nearRange: number): Node | Vector3;

  /**
   * Returns the closest node to the target position.
   * @param  {Vector3} position
   * @param  {string}  zoneID
   * @param  {number}  groupID
   * @param  {boolean} checkPolygon
   * @return {Node}
   */
  getClosestNode(position: Vector3, zoneID: string, groupID: number, checkPolygon: boolean): Node;

  /**
   * Returns a path between given start and end points. If a complete path
   * cannot be found, will return the nearest endpoint available.
   *
   * @param  {Vector3} startPosition Start position.
   * @param  {Vector3} targetPosition Destination.
   * @param  {string} zoneID ID of current zone.
   * @param  {number} groupID Current group ID.
   * @return {Array<Vector3>} Array of points defining the path.
   */
  findPath(startPosition: Vector3, targetPosition: Vector3, zoneID: string, groupID: number): Vector3[];

  /**
   * Returns closest node group ID for given position.
   * @param  {string} zoneID
   * @param  {Vector3} position
   * @return {number}
   */
  getGroup(zoneID: string, position: Vector3, checkPolygon): number;


  /**
   * Clamps a step along the navmesh, given start and desired endpoint. May be
   * used to constrain first-person / WASD controls.
   *
   * @param  {Vector3} start
   * @param  {Vector3} end Desired endpoint.
   * @param  {Node} node
   * @param  {string} zoneID
   * @param  {number} groupID
   * @param  {Vector3} endTarget Updated endpoint.
   * @return {Node} Updated node.
   */
  clampStep(startRef: Vector3, endRef: Vector3, node: Node, zoneID: string, groupID: number, endTarget: Vector3): Node;

}

/**
 * Defines a zone of interconnected groups on a navigation mesh.
 *
 * @type {Object}
 * @property {Array<Group>} groups
 * @property {Array<Vector3>} vertices
 */
interface Zone {
  groups: Group[],
  vertices: Vector3[]
}

/**
 * Defines a group within a navigation mesh.
 *
 * @type {Object}
 */
type Group = Node[];

/**
 * Defines a node (or polygon) within a group.
 *
 * @type {Object}
 * @property {number} id
 * @property {Array<number>} neighbours IDs of neighboring nodes.
 * @property {Array<number>} vertexIds
 * @property {Vector3} centroid
 * @property {Array<Array<number>>} portals Array of portals, each defined by two vertex IDs.
 * @property {boolean} closed
 * @property {number} cost
 */
interface Node {
  id: number,
  neighbours: number[],
  vertexIds: number[],
  centroid: Vector3,
  closed: boolean,
  cost: number
}

/**
 * Helper for debugging pathfinding behavior.
 */
declare class PathfindingHelper extends Object3D {

  /**
   * @param {Array<Vector3>} path
   * @return {this}
   */
  setPath(path: Vector3[]): this;

  /**
   * @param {Vector3} position
   * @return {this}
   */
  setPlayerPosition(position: Vector3): this;

  /**
   * @param {Vector3} position
   * @return {this}
   */
  setTargetPosition(position: Vector3): this;


  /**
   * @param {Vector3} position
   * @return {this}
   */
  setNodePosition(position: Vector3): this;

  /**
   * @param {Vector3} position
   * @return {this}
   */
  setStepPosition(position: Vector3): this;
  /**
   * Hides all markers.
   * @return {this}
   */
  reset(): this;
}

export { Pathfinding, PathfindingHelper, Node, Zone, Group };

