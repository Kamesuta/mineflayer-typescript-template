import * as mineflayer from "mineflayer";
import pathfinder from "mineflayer-pathfinder";

// スリープ
const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

// Botを初期化してログイン
const bot = mineflayer.createBot({
  host: "localhost",
  username: "Bot",
  version: "1.16.5",
});
// パスファインダーを有効化
bot.loadPlugin(pathfinder.pathfinder);

// チャット入力時
bot.on("chat", async (username, message) => {
  // 自身の発言は無視
  if (username === bot.username) return;
  // 発言者のエンティティを取得
  const target = bot.players[username].entity;

  // チャットコマンド
  switch (message) {
    case "say": {
      // チャットに発言
      // 発言1
      bot.chat("Hello World!");
      // ちょっと待つ
      await sleep(1000);
      // 発言2
      bot.chat("Hello World 2!");
    }

    case "come":
      // 現在の位置まで移動
      {
        // 目的地を設定
        const goal = new pathfinder.goals.GoalBlock(
          target.position.x,
          target.position.y,
          target.position.z
        );
        // 移動完了
        bot.chat(`移動開始: 目的地(${goal.x}, ${goal.y}, ${goal.z})`);
        // tryの代わりに bot.pathfinder.goto(goal).catch((err) => { エラー処理 }) でもOK
        try {
          // 移動開始
          await bot.pathfinder.goto(goal);
          // 移動完了
          bot.chat("移動しました");
        } catch (e) {
          bot.chat("移動エラー");
        }
      }
      break;

    case "stop":
      // 移動をキャンセル
      {
        bot.chat("移動キャンセル");
        bot.pathfinder.stop();
      }
      break;
  }
});
