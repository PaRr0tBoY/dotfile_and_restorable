# Data Structure And Algorithm

/* Stack */

/* Def the Stack using array */
#define MaxSize 100
typedef struct SNode{
	int Data[MaxSize]; //Array
	//Top represents stack top index
	int Top;
}*Stack;

/* Push action */
void push(Stack stack, int item){
	if(stack->Top = MaxSize-1){
		printf("Stack is full.\n");
		return;
	}
	//start push
	stack->Data[++(stack->Top)] = item;
	return;
}

/* Pop action */
int pop(Stack PtrS){
	if(stack->Top == -1){
		printf("Stack is empty.\n");
		return;
	}
	//pop Top
	return PtrS->Data[(PtrS->Top)--];
}

/* Double Stack */

/* Stack is implemented with array */

/* Implement two stacks with one array here */

#define MaxSize 1000
struct DStack{
	int Data[MaxSize];
	int Top1;
	int Top2;
}S;

/*
When Top = -1 represent left most position of the array.While MaxSize is the left most position.
*/

S.Top1 = -1;
S.Top2 = MaxSize;

void push(S DPtrS, int item, int Tag){
	if(DPtrS->Top1 == DPtrS->Top2){
		printf("Dstack Full.\n");
		return;
	}
	if(Tag = 1) 
		DPtrS->Data[++(DPtrS->Top1)] == item;
	else 
		DPtrS->Data[++(DPtrS->Top2)] == item;
	return;
}

void pop(S DPtrS, int Tag){
	if(Tag = 1){
		if(DPtrS->Top1 == -1){
			printf("Stack1 Empty\n");
			return;
		}else
			return DPtrS->Data[(DPtrS->Top1)--];
	}else
	{
		if(DPtrS->Top2 == MaxSize){
			printf("Stack2 Empty\n");
			return;
		}else
			return DPtrS->Data[(DPtrS->Top2)++];
	}
}

/* LinkStack */
typedef struct SNode
{
	int Data;
	struct SNode *next;
}*LinkStack,LNode;

LinkStack CreateStack(){
	LinkStack S;
	S = (LinkStack)malloc(sizeof(LNode));
	S->next = NULL;
	return S;
}

int IsEmpty(LinkStack S){
	return(S->next == NULL);
}

void push(LinkStack S, int item){
	LinkStack iNode;
	iNode = (LinkStack)malloc(sizeof(LNode));
	iNode->Data = item;
	iNode->next = S->next;
	S->next = iNode;
}

void pop(LinkStack S){
	LinkStack FirstCell;
	int TopData;
	if(IsEmpty(S)){
		printf("LinkStack Empty.\n");
		return NULL;
	}
	FirstCell = S->next;
	S->next = FirstCell->next;
	TopData = FirstCell->Data;
	free(FirstCell);
	return TopData;
}

/* QUEUE */

#define MaxSize 100;
typedef struct qNode{
	ElementType Data[MaxSize];
	int rear;
	int front;
}*Queue,QNode;

Queue CreateQueue(int MaxSize){

}

/* front index the previous element of head element */
/* rear index the actual last element */
/* When delete an element, add 1 on front */
/* When add an element, add 1 on rear */

void AddQ(Queue que, ElementType item){
	/* Determine whether the queue is full */
	/* When add an element, consider insert the element item to queue's rear */
	/* At first, rear = front = -1. Until rear equals to front again the queue is full */
	if((que->rear + 1) % MaxSize == que->front){
		printf("Queue full.\n");
		return;
	}
	/* 
	If que->rear is MaxSize - 1 then [(rear+1)] will equal to MaxSize which would be array index out of bound
	*/
	que->rear = (que->rear + 1) % MaxSize;
	que->Data[que->rear] = item;
}

ElementType deleteQ(Queue que){
	/* Determine whether queue is empty already */
	if(que->rear == que->full == -1){
		printf("que empty.\n");
		return;
	}
	/* Finish processing one element at front */
	/* front + 1 */
	que->front = (que->front + 1) % MaxSize;
	return que->Data[que->front];
}

/* Implement queue with LinkedList */
/* Seperate declare queue and LinkedList's ptr */

//Def LinkQueue Node
typedef struct qNode{
	ElementType Data;
	struct qNode *next;
}qNode, *queue;


//Def LinkQueue Structure
struct qNode{
	queue rear;
	queue front;
}

ElementType DeleteQ(queue PtrQ){
	queue FrontCell;
	ElementType FrontElem;

	if(PtrQ->front == Null){
		printf("Queue empty.Nothing to delete.\n");
		return ERROR;
	}

	FrontCell = PtrQ->front;
	/*
	If only one element is in the queue,point both front and rear ptr to NULL 
	*/
	/*
	Else keep moving the front ptr.
	*/
	if(PtrQ->front == PtrQ->rear)
			PtrQ->front = PtrQ->rear = NULL;
	else
			PtrQ->front = PtrQ->front->next;

	FrontElem = FrontCell->Data;
	free(FrontCell);
	return FrontElem;
}

void AddQ(queue PtrQ, ElementType item){
	/*
	Create a cell to hold the item to be inserted 
	Link Queue will never be full
	rear move to next 
	*/
	queue newCell = (queue)malloc(sizeof(qNode));
	newCell->Data = item;
	newCell->next = NULL;

	if(PtrQ->rear == NULL)
		PtrQ->front = PtrQ->rear = newCell;
	else
	{
		PtrQ->rear->next = newCell;
		PtrQ->rear = newCell;
	}
}





