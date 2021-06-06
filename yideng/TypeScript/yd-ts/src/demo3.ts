type OrderID = string & { readonly brand: unique symbol };

type UserID = string & { readonly brand: unique symbol };

type ID = OrderID | UserID;

//伴侣模式
function OrderID(id: string) {
  return id as OrderID;
}

function UserID(id: UserID) {
  return id as UserID;
}

function queryForUser(id: ID) {}

queryForUser(UserID('laoyuan'));
