import { Grid, Image, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
export default function Note() {
  const router = useRouter();
  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={2} />
        <Grid.Column width={12}>
          <div className="lb-wrap">
            <div className="lb-image">
              <Image
                className="centered lb-image"
                src="/images/noteTitle.png"
                alt="noteTitle image"
              ></Image>
            </div>
            <div className="lb-text">
              <h2>Title: my Note</h2>
            </div>
          </div>

          <div className="lb-wrap">
            <div className="lb-image">
              <Image
                className="centered"
                src="/images/note.jpg"
                alt="note image"
              ></Image>
            </div>
            <div className="lb-text">
              <h3>
                내용 적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용
                적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용 적는중
                어떻게 나오려나 내용 적는중 어떻게 나오려나내용 적는중 어떻게
                나오려나내용 적는중 어떻게 나오려나
              </h3>
            </div>
          </div>
          <Grid>
            <Grid.Row centered>
              <div>
                <Button negative style={{ margin: "20px" }}>
                  삭제
                </Button>
                <Button
                  primary
                  style={{ margin: "20px" }}
                  onClick={() => {
                    router.push(`/note/edit`);
                  }}
                >
                  수정
                </Button>
              </div>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid.Row>

      <style jsx>
        {`
          .lb-wrap {
            width: 40%;
            margin: 10px auto;
            position: relative;
          }
          .lb-text {
            padding: 5px 10px;
            z-index: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .lb-wrap img {
            width: 100%;
            vertical-align: middle;
          }
          h2 {
            font-size: 1.5vw;
            color: rgb(97, 17, 70);
          }
          h3 {
            font-size: min(1vw, 1.5vh);
            color: rgb(97, 17, 70);
          }
        `}
      </style>
    </Grid>
  );
}
