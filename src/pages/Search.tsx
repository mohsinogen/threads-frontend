import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { searchUsers } from "../utils/api";
import { useHistory } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState<string>("");

  const { user } = useContext(AuthContext);

  const history = useHistory();

  const [users, setUsers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const getUserList = (
    token: string,
    page: number,
    callback = () => {
      /*  */
    }
  ) => {
    searchUsers(token, page, search)
      .then((res) => {
        setTotalPages(res.data.data.totalPages);
        if (page == 1) {
          setUsers(res.data.data.data);
        } else {
          setUsers([...users, ...res.data.data.data]);
        }
        callback();
      })
      .catch((error) => {
        callback();
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      getUserList(user.token, 1);
    }
  }, [search]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search}
            onIonInput={(e) => {
              console.log(e.detail.value);

              if (user) {
                setSearch(e.detail.value ? e.detail.value : "");
              }
            }}
            mode="ios"
            animated={true}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCol>
          {users.map((item) => (
            <IonRow key={item._id}>
              <IonCol size="2">
                {item.profile && (
                  <IonAvatar
                    style={{ width: "2rem", height: "2rem" }}
                    onClick={() => {
                      history.push(`/userprofile/${item.email}`);
                    }}
                  >
                    <img alt="profile img" src={item.profile} />
                  </IonAvatar>
                )}
              </IonCol>
              <IonCol
                style={{ borderBottom: "0.1px solid var(--ion-color-medium)" }}
              >
                <IonRow>
                  <IonCol size="8">
                    <IonRow>
                      <IonText>{item?.email?.split("@")[0]}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText>{item.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText>{item?.followers?.length} followers</IonText>
                    </IonRow>
                  </IonCol>
                  <IonCol size="4">
                    <IonButton
                      mode="ios"
                      size="small"
                      expand="block"
                      fill="outline"
                    >
                      Follow
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          ))}
        </IonCol>
      </IonContent>
    </IonPage>
  );
}

export default Search;
