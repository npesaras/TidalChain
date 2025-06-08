import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
// this module containes the future modules for the tidal chain backend.
module {

    public type Permission = {
        id: Text;
        name: Text;
        description: Text;
    };

    public type PermissionType = {
        id: Text;
        name: Text;
        description: Text;
        permissions: [Permission];
    };

    public type PrincipalsByPermission = {
        permission_type: PermissionType;
        principals: [Principal.Principal];
    };

    // this function isn't scalable 
    // public type UserToUserPermission = {
    //     user_actor_principal: Principal.Principal;
    //     second_person_principal: Principal.Principal;
    //     permissions: [Text];

    // };

    // stable var principals_by_permission: [PrincipalsByPermission] = [];
    // stable var source: [Source] = [];
    // 
    //
    // let permissionTypes: [PermissionType] = [{ id: 1; name: "Admin"}]
    // types of resources:
    // publicly shared resources (do not require permission), user resources (require permission)
    // private resouarces (onlt accessible by the owner), semi private resources (accessible by the owner and the requested users by the owner),


    // function for middlewares to check is the user has the permission to access another principal's resources
    public func permission(_principal: Principal.Principal) {
        // pass
    };

    // multimodal sources
    public type Source = {
        sourceType: Text;
        sourceId: ?Text; // may contain an id by a third party service such as Pinata or IPFS or may contain blob data for other types of media
        sourcePermission: Text; 
        sourceData: ?Blob;
    };

    // source filter options
    public type sourceFIlterOptions = {
        sourceType: ?Text;
        sourceId: ?Text;
        sourcePermission: ?Text;
        sourceData: ?Blob;
    };

    // function to get the source by id
    public func source_manager(_filter_options: sourceFIlterOptions) {
        // pass
    }

    
}