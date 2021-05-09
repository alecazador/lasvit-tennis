import { put, takeEvery, call, all, select } from "redux-saga/effects";
import { actionKeys } from "../actions/actionTypes";
import { API, graphqlOperation } from "aws-amplify";
import { listClientBillings } from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import {
  fetchBillingList,
  fetchBillingListAction,
  showPayloadModalAction,
} from "../actions/apiAction";
import { postToken } from "../api/pay";
import { postSubscribe } from "../api/subscribe";
import { toogleLoading } from "../actions/clientAction";

// AWS API
function* handleFetchBillingList() {
  try {
    yield put(toogleLoading(true));
    let billingList = [];
    yield API.graphql(graphqlOperation(listClientBillings)).then(({ data }) => {
      billingList = data.listClientBillings.items;
    });
    billingList.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
    );

    yield put(fetchBillingList(billingList));
  } catch (error) {
    console.log("[error handleFetchBillingList]", error);
  } finally {
    yield put(toogleLoading(false));
  }
}

function* handleCreateBilling(action) {
  try {
    const { client } = yield select((state) => state.clientState);
    const { data, token } = action.payload;
    const response = call(postToken, token, data.amount * 100);
    const payObject = response.payload.args[0];

    yield API.graphql({
      query: mutations.createClientBilling,
      variables: {
        input: {
          ...data,
          ...{
            payload: {
              id: payObject.id,
              created: payObject.created,
            },
          },
        },
      },
    });

    yield all([
      put(fetchBillingListAction()),
      call(postSubscribe, "payer", client.email),
      put(showPayloadModalAction(true)),
    ]);
  } catch (error) {
    console.log("[error handleCreateBilling]", error);
  } finally {
  }
}

export function* apiSagas() {
  yield takeEvery(
    actionKeys.FETCH_BILLING_LIST_REQUEST,
    handleFetchBillingList
  );
  yield takeEvery(actionKeys.CREATE_BILLING_REQUEST, handleCreateBilling);
}
